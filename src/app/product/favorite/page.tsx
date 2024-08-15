"use client";
import { Product } from "@/type/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { PRODUCT_API_URL } from "@/lib/util";
import { MdDeleteForever, MdStar } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";

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
        <FaRegImage style={{ fontSize: "50px", color: "#ccc" }} />
        <h2>Chưa có sản phẩm yêu thích.</h2>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">
        Your favorite products
      </h1>
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
                  className="product-image"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}$</td>
              <td>
                <button
                  onClick={() => handleRemoveFavorite(product.id)}
                  className="delete-button"
                >
                  <MdDeleteForever />
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
          margin-top: 100px;
        }
        .favorites-title {
          font-size: 28px;
          color: #333;
          background: linear-gradient(to right, red, orange);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
          text-align: center;
        }
        .favorites-table {
          border-collapse: collapse;
          width: 80%;
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .favorites-table th,
        .favorites-table td {
          padding: 12px;
          text-align: left;
        }
        .favorites-table th {
          background-color: #ff8c00;
          color: white;
        }
        .favorites-table tr {
          border-bottom: 1px solid #ddd;
        }
        .favorites-table img.product-image {
          width: 80px;
          height: 80px;
          border-radius:50px;
          object-fit: cover;
        }
        .favorites-table button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          color: red;
          font-size: 24px;
        }
        .favorites-table button:hover {
          color: #ff4d4d;
        }
        .favorites-table td {
          position: relative;
        }
        .favorites-table td::after {
          content: "";
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #ff8c00, #ff4500);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .favorites-table td:hover::after {
          transform: scaleX(1);
        }
        @media (max-width: 480px) {
          .favorites-container {
            padding: 10px;
            margin-top: 80px;
          }
          .favorites-table {
            width: 95%;
          }
          .favorites-table img.product-image {
            width: 60px;
            height: 60px;
          }
          .favorites-table th,
          .favorites-table td {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
}
