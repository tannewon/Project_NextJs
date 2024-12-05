"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import pay from "../../../public/download1.png";

const PaymentPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
  }, []);

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "row", // Chuyển sang row để hiển thị 2 div bên cạnh nhau
        justifyContent: "space-between", // Khoảng cách đều giữa các div
        alignItems: "flex-start", // Căn trên cùng
        marginTop: "100px",
        gap: "20px",
        width: "100vw", // Full width
      }}
    >
      <div
        style={{
          flex: 1, // Chia đều không gian cho cả 2 div
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "20px",
            color: "#333",
            background: "linear-gradient(to right, red, orange)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your Cart
        </h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {cartItems.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "20px",
                  borderRadius: "4px",
                  objectFit: "cover",
                }}
              />
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "18px",
                    margin: 0,
                    color: "#333",
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    margin: "5px 0 0 0",
                  }}
                >
                  Quantity: {item.quantity}
                </p>
              </div>
              <p
                style={{
                  fontSize: "16px",
                  color: "#333",
                  margin: 0,
                }}
              >
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "red",
            textAlign: "right",
          }}
        >
          Total Price: ${getTotalPrice()}
        </p>
      </div>
      <div
        style={{
          flex: 1, // Chia đều không gian cho cả 2 div
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          textAlign: "center", // Center content
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "20px",
            color: "#333",
            background: "linear-gradient(to right, red, orange)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Checkout
        </h2>

        <Image
          style={{ borderRadius: "20px", marginTop: "20px" }}
          src={pay}
          alt="Nike"
          width={300}
          height={250}
        />

        <Link href="https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder">
          <button
            style={{
              marginTop: "20px",
              background: "linear-gradient(to right, orange, red, gray)",
              color: "#fff",
              border: "none",
              padding: "15px 20px",
              borderRadius: "4px",
              fontSize: "18px",
              cursor: "pointer",
              transition: "background-color 0.3s ease", // Smooth transition for hover effect
              marginLeft:'20px'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background =
                "linear-gradient(to right, gray, red, orange)"; // Lighter gradient on hover
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background =
                "linear-gradient(to right, orange, red, gray)"; // Original background on leave
            }}
          >
            Online payment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentPage;
