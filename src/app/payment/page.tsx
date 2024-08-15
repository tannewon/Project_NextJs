"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


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
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "20px",
          marginRight: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            width:'150px',
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
          flex: 1,
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            width:'150px',
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
