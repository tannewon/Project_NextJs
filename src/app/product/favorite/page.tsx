"use client";
import { Product } from "@/type/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { PRODUCT_API_URL } from "@/lib/util";
import { MdDeleteForever } from "react-icons/md";
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        marginTop: "100px",
        marginBottom: "50px",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          color: "#333",
          background: "linear-gradient(to right, red, orange)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Your favorite products
      </h1>
      <table
        style={{
          borderCollapse: "collapse",
          width: "80%",
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#ff8c00",
                color: "white",
              }}
            >
              Image
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#ff8c00",
                color: "white",
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#ff8c00",
                color: "white",
              }}
            >
              Description
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#ff8c00",
                color: "white",
              }}
            >
              Price
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#ff8c00",
                color: "white",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50px",
                    objectFit: "cover",
                  }}
                />
              </td>
              <td
                style={{
                  color: "#888",
                }}
              >
                {product.name}
              </td>
              <td style={{
                  color: "#888",
                }}>{product.description}</td>
              <td style={{
                  color: "red",
                }}>{product.price}$</td>
              <td>
                <button
                  onClick={() => handleRemoveFavorite(product.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
                    color: "red",
                    fontSize: "24px",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#ff4d4d")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "red")}
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
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
