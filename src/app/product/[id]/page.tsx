"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { PRODUCT_API_URL } from "@/lib/util";

async function getPost(id: string) {
  const res = await fetch(`${PRODUCT_API_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function DashboardDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [post, setPost] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getPost(id);
        setPost(postData);
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (post) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const existingItem = cartItems.find((item: any) => item.id === post.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({ ...post, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert("Added to cart!");
      router.push("/product");
    }
  };

  const handleAddToFavorites = () => {
    if (post) {
      const favoriteItems = JSON.parse(localStorage.getItem("favoriteItems") || "[]");
      const existingItem = favoriteItems.find((item: any) => item.id === post.id);

      if (!existingItem) {
        favoriteItems.push(post);
        localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
      }

      alert("Added to favorites!");
      router.push(`/product/favorite?id=${id}`);
    }
  };

  const handleBack = () => {
    router.push("/product");
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px",marginTop:'100px' }}>
      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", backgroundColor: "#fff" }}>
        <img
          src={post.image}
          alt={post.name}
          style={{ width: "550px", height: "400px", objectFit: "cover", borderRadius: "8px" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button
            onClick={handleAddToFavorites}
            style={{
              backgroundColor: "red",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <AiOutlineHeart style={{ width: "20px", height: "20px" }} />
          </button>
          <button
            onClick={handleAddToCart}
            style={{
              backgroundColor: "#f1c40f",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <MdOutlineProductionQuantityLimits style={{ width: "20px", height: "20px" }} />
          </button>
          <button
            onClick={handleBack}
            style={{
              backgroundColor: "#7f8c8d",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            Back
          </button>
        </div>
        <div
          style={{
            backgroundColor: "#f8f8f8",
            width: "500px",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            marginTop: "20px",
          }}
        >
          <h1 style={{ color: "#333" }}>{post.name}</h1>
          <p style={{ color: "#e74c3c", fontSize: "1.2em" }}>{post.price}$</p>
          <p style={{ color: "#555" }}>{post.description}</p>
        </div>
      </div>
    </div>
  );
}
