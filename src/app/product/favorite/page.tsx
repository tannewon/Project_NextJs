"use client";
import { Product } from "@/type/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { PRODUCT_API_URL } from "@/lib/util";
import { MdDeleteForever } from "react-icons/md";

async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${PRODUCT_API_URL}/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product with ID: ${id}`);
  }
  return res.json();
}

export default function FavoritesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  useEffect(() => {
    const loadFavorites = () => {
      const savedProductIds = JSON.parse(
        localStorage.getItem("productIds") || "[]"
      );
      const savedProducts: Product[] = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      setProducts(
        savedProducts.filter((product) => savedProductIds.includes(product.id))
      );
    };

    const fetchFavorite = async () => {
      if (!productId) return;

      try {
        const productData = await fetchProduct(productId);
        const savedProductIds = JSON.parse(
          localStorage.getItem("productIds") || "[]"
        );
        const savedProducts: Product[] = JSON.parse(
          localStorage.getItem("products") || "[]"
        );

        if (!savedProductIds.includes(productId)) {
          savedProductIds.push(productId);
          savedProducts.push(productData);
        }

        localStorage.setItem("productIds", JSON.stringify(savedProductIds));
        localStorage.setItem("products", JSON.stringify(savedProducts));
        setProducts(savedProducts);
        router.push("/product/favorite");
      } catch (error) {
        console.error(`Failed to fetch product with ID: ${productId}`, error);
      }
    };

    if (productId) {
      fetchFavorite();
    } else {
      loadFavorites();
    }
  }, [productId]);

  const handleRemoveFavorite = (id: string) => {
    const savedProductIds = JSON.parse(
      localStorage.getItem("productIds") || "[]"
    );
    const updatedProductIds = savedProductIds.filter(
      (productId: string) => productId !== id
    );
    const savedProducts: Product[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    const updatedProducts = savedProducts.filter(
      (product) => product.id !== id
    );

    localStorage.setItem("productIds", JSON.stringify(updatedProductIds));
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    alert("Đã xóa khỏi danh sách yêu thích!");
    if (updatedProducts.length === 0) {
      router.push("/product");
    }
  };

  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Chưa có sản phẩm yêu thích.
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Your favorite products</h1>
      <table className="favorites-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}$</td>
              <td>
                <button
                  onClick={() => handleRemoveFavorite(product.id)}
                >
                  <MdDeleteForever style={{ width: "25px", height: "25px", color: "red" }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .favorites-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 20px;
          margin-top: 150px;
        }
        .favorites-title {
          color: orange;
          margin-bottom: 20px;
        }
        .favorites-table {
          border-collapse: collapse;
          width: 90%;
          background-color: #f0f0f0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .favorites-table th,
        .favorites-table td {
          padding: 15px;
          text-align: left;
        }
        .favorites-table th {
          background-color: #ffa500;
          color: white;
        }
        .favorites-table tr {
          border-bottom: 1px solid #ddd;
        }
        .favorites-table img {
          width: 120px;
          height: 120px;
          border-radius: 8px;
        }
        .favorites-table button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 10px;
        }
        .favorites-table .MdDeleteForever {
          width: 30px;
          height: 30px;
          color: red;
        }
        @media (max-width: 480px) {
          .favorites-container {
            padding: 10px;
            margin-top: 100px;
          }
          .favorites-table {
            width: 100%;
          }
          .favorites-table img {
            width: 90px;
            height: 90px;
          }
          .favorites-table th,
          .favorites-table td {
            padding: 10px;
          }
        }
        @media (max-width: 600px) {
          .favorites-container {
            padding: 15px;
            margin-top: 120px;
          }
          .favorites-table {
            width: 95%;
          }
          .favorites-table img {
            width: 100px;
            height: 100px;
          }
          .favorites-table th,
          .favorites-table td {
            padding: 12px;
          }
        }
        @media (max-width: 800px) {
          .favorites-container {
            padding: 15px;
            margin-top: 120px;
          }
          .favorites-table {
            width: 95%;
          }
          .favorites-table img {
            width: 110px;
            height: 110px;
          }
          .favorites-table th,
          .favorites-table td {
            padding: 12px;
          }
        }
        @media (max-width: 768px) {
          .favorites-container {
            padding: 15px;
            margin-top: 120px;
          }
          .favorites-table {
            width: 95%;
          }
          .favorites-table img {
            width: 110px;
            height: 110px;
          }
          .favorites-table th,
          .favorites-table td {
            padding: 12px;
          }
        }
        @media (max-width: 1024px) {
          .favorites-container {
            padding: 20px;
            margin-top: 150px;
          }
          .favorites-table {
            width: 90%;
          }
          .favorites-table img {
            width: 120px;
            height: 120px;
          }
          .favorites-table th,
          .favorites-table td {
            padding: 15px;
          }
        }
        @media (min-width: 1025px) {
          .favorites-container {
            padding: 20px;
            margin-top: 150px;
          }
          .favorites-table {
            width: 90%;
          }
          .favorites-table img {
            width: 120px;
            height: 120px;
          }
          .favorites-table th,
          .favorites-table td {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}
