"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { PRODUCT_API_URL } from "@/lib/util";
import { IoStar } from "react-icons/io5";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

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
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("red");
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
        existingItem.quantity += quantity;
      } else {
        cartItems.push({ ...post, quantity, color: selectedColor });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert("Added to cart!");
      router.push("/product");
    }
  };

  const handleAddToFavorites = () => {
    if (post) {
      const favoriteItems = JSON.parse(
        localStorage.getItem("favoriteItems") || "[]"
      );
      const existingItem = favoriteItems.find(
        (item: any) => item.id === post.id
      );

      if (!existingItem) {
        favoriteItems.push(post);
        localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
      }

      alert("Added to favorites!");
      router.push(`/product/favorite?id=${id}`);
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const totalPrice = (post.price * quantity).toFixed(2);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "50px",
        marginTop: "100px",
        backgroundColor: "#f0f0f5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "1200px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            flex: "1",
            marginRight: "20px",
          }}
        >
          <Image
            src={post.image}
            alt={post.name}
            width={600}
            height={500}
            style={{
              borderRadius: "12px",
            }}
          />
        </div>
        <div
          style={{
            flex: "2",
          }}
        >
          <div
            style={{
              backgroundColor: "#f8f8f8",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1
              style={{
                color: "#333",
                fontSize: "2em",
                marginBottom: "10px",
              }}
            >
              {post.name}
            </h1>
            <p
              style={{
                color: "#e74c3c",
                fontSize: "1.5em",
                marginBottom: "20px",
              }}
            >
              ${totalPrice}
            </p>
            <div>
              {[...Array(5)].map((_, index) => (
                <IoStar
                  key={index}
                  style={{ margin: "0 2px", color: "#FF9900" }}
                />
              ))}
            </div>
            <p
              style={{
                color: "#555",
              }}
            >
              {post.description}
            </p>

            <div style={{ marginTop: "40px" }}>
              <label style={{ marginRight: "10px" }}>Quantity:</label>
              <button
                style={{ width: "30px", height: "30px" }}
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span style={{ margin: "0 10px" }}>{quantity}</span>
              <button
                style={{ width: "30px", height: "30px" }}
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <label style={{ marginRight: "10px" }}>Color:</label>
              {["red", "blue", "yellow"].map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  style={{
                    backgroundColor: color,
                    border:
                      selectedColor === color ? "2px solid black" : "none",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    margin: "0 5px",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", marginTop: "30px" }}>
              <button
                onClick={handleAddToCart}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "180px",
                  borderRadius: "5px",
                  backgroundColor: "orange",
                  padding: "10px 20px",
                  color: "white",
                }}
              >
                ADD Cart
                <FaShoppingCart
                  style={{ width: "20px", height: "20px", marginLeft: "10px" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
