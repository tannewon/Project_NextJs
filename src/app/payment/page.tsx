"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const PaymentPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
  }, []);

  const handleCheckout = async () => {
    try {
      console.log("Cart items:", cartItems); // Log to check cart items

      const response = await fetch("https://buy.stripe.com/test_00g7v64lTd9EfVS9AB", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
      );
      if (!stripe) {
        throw new Error("Stripe could not be loaded");
      }
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

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
            fontSize: "24px",
            marginBottom: "20px",
            color: "#333",
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
            color: "#333",
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
            fontSize: "24px",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Checkout
        </h2>
        <button
          onClick={handleCheckout}
          style={{
            marginTop: "20px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            padding: "15px 20px",
            borderRadius: "4px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
