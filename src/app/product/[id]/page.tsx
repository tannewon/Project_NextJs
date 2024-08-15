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
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getPost(id);
        setPost(postData);
      } catch (error) {
        console.error("Failed to fetch post data:", error);
        // Consider setting an error state and showing an error message
      }
    };

    fetchData();
  }, [id]);
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };
  const handleAddToCart = () => {
    if (post) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const existingItem = cartItems.find((item: any) => item.id === post.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push({
          ...post,
          quantity,
          size: selectedSize,
          color: selectedColor,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      // router.push("/product");
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  if (!post) {
    return <div>Loading...</div>; // Show loading state or message
  }

  const originalPrice = Number(post.price);
  const promotionPrice = Number(post.promotion);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "50px",
        backgroundColor: "#f0f0f5",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "1200px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          background: "linear-gradient(to right, orange, white)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            position: "relative",
            marginRight: "20px",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <span
            style={{
              padding: "10px",
              backgroundColor: "red",
              position: "absolute",
              right: "0",
              top: "0",
              color: "white",
            }}
          >
            -10%
          </span>
          <Image
            src={post.image}
            alt={post.name}
            width={600}
            height={460}
            style={{
              borderRadius: "12px",
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div
          style={{
            flex: "2",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(to left, orange, red)",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1
              style={{
                fontSize: "45px",
                background: "linear-gradient(to right, white, #FFCC33)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "0px",
              }}
            >
              {post.name}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "1.5em",
                  textDecoration: "line-through",
                }}
              >
                ${originalPrice.toFixed(2)}
              </p>
              {promotionPrice > 0 && (
                <p
                  style={{
                    color: "#27ae60",
                    fontSize: "1.5em",
                  }}
                >
                  ${promotionPrice.toFixed(2)}
                </p>
              )}
            </div>
            <div
              style={{
                margin: "10px 0",
              }}
            >
              {[...Array(5)].map((_, index) => (
                <IoStar
                  key={index}
                  style={{
                    margin: "0 2px",
                    color: "#FF9900",
                    width: "20px",
                    height: "20px",
                  }}
                />
              ))}
            </div>
            <p style={{ color: "white", fontSize: "18px" }}>
              {post.description}
            </p>
            <div style={{ marginTop: "40px" }}>
              <label
                style={{
                  marginRight: "10px",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                Quantity:
              </label>
              <button
                style={{ width: "30px", height: "30px" }}
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span style={{ margin: "0 10px", color: "white" }}>
                {quantity}
              </span>
              <button
                style={{ width: "30px", height: "30px" }}
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <label
                  style={{
                    marginRight: "10px",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Size:
                </label>
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    style={{
                      border:
                        selectedSize === size ? "2px solid black" : "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      margin: "0 5px",
                      cursor: "pointer",
                      backgroundColor:
                        selectedSize === size ? "gray" : "transparent",
                      color: selectedSize === size ? "white" : "white",
                      fontSize: "16px",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label
                  style={{
                    marginRight: "10px",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Color:
                </label>
                {["green", "blue", "yellow"].map((color) => (
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
            </div>

            <div style={{ display: "flex", marginTop: "30px" }}>
              <button
                onClick={handleAddToCart}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid white",
                  cursor: "pointer",
                  borderRadius: "5px",
                  backgroundColor: isHovered ? "red" : "orange",
                  padding: "10px 20px",
                  color: "white",
                  fontSize: "18px",
                  transition: "background-color 0.3s",
                  marginBottom: "10px",
                }}
              >
                Add Cart{" "}
                <FaShoppingCart
                  style={{ width: "20px", height: "20px", marginLeft: "10px" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Queries */}
      <style jsx>{`
        @media (max-width: 768px) {
          div {
            padding: 10px;
          }

          div {
            flex-direction: column;
            padding: 10px;
          }

          div {
            margin-right: 0;
            width: 100%;
            margin-bottom: 10px;
          }

          img {
            width: 100%;
            height: auto;
          }

          div {
            flex: 1;
            padding: 10px;
          }

          h1 {
            font-size: 2em;
            width: auto;
          }

          div {
            flex-direction: column;
          }

          div {
            margin-top: 20px;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 1.5em;
          }

          div {
            font-size: 1em;
          }

          p {
            font-size: 1em;
          }

          button {
            width: 25px;
            height: 25px;
          }

          button {
            width: 25px;
            height: 25px;
          }

          button {
            font-size: 1em;
            padding: 5px 10px;
          }
        }
      `}</style>
    </div>
  );
}
