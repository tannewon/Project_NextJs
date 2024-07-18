"use client";
import { Product } from "@/type/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { PRODUCT_API_URL } from "@/lib/util";

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
      const savedProductIds = JSON.parse(localStorage.getItem("productIds") || "[]");
      const savedProducts: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
      setProducts(savedProducts.filter(product => savedProductIds.includes(product.id)));
    };

    const fetchFavorite = async () => {
      if (!productId) return;

      try {
        const productData = await fetchProduct(productId);
        const savedProductIds = JSON.parse(localStorage.getItem("productIds") || "[]");
        const savedProducts: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
        
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
    const savedProductIds = JSON.parse(localStorage.getItem("productIds") || "[]");
    const updatedProductIds = savedProductIds.filter((productId: string) => productId !== id);
    const savedProducts: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
    const updatedProducts = savedProducts.filter(product => product.id !== id);

    localStorage.setItem("productIds", JSON.stringify(updatedProductIds));
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    alert("Đã xóa khỏi danh sách yêu thích!");
    if (updatedProducts.length === 0) {
      router.push("/product");
    }
  };

  if (products.length === 0) {
    return <div>Chưa có sản phẩm yêu thích.</div>;
  }

  return (
    <div style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", display: "flex", padding: "20px" }}>
      <h1 style={{ color: "orange" }}>Favorite Products</h1>
      <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: "800px" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", textAlign: "left" }}>Image</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Description</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Price</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ padding: "10px" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td style={{ padding: "10px" }}>{product.name}</td>
              <td style={{ padding: "10px" }}>{product.description}</td>
              <td style={{ padding: "10px" }}>{product.price}$</td>
              <td style={{ padding: "10px" }}>
                <button
                  onClick={() => handleRemoveFavorite(product.id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
