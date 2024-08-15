"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface CartContextType {
  addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
  }, []);

  const handleDeleteItem = (id: string) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleToggleCart = () => {
    setShowCart(!showCart);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    setShowCart(false);
    router.push("/payment");
  };

  return (
    <CartContext.Provider value={{ addToCart }}>
      <div style={{ display: "flex", gap: "5px" }}>
        <FaShoppingCart
          style={{
            marginLeft: "20px",
            width: "25px",
            height: "25px",
            cursor: "pointer",
          }}
          onClick={handleToggleCart}
        />
        {getTotalItems() > 0 && (
          <span
            style={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px", // Tăng kích thước padding
              fontSize: "16px", // Tăng kích thước font
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "10px", // Tăng kích thước vòng tròn
              minHeight: "10px", // Tăng kích thước vòng tròn
            }}
          >
            {getTotalItems() || 0}
          </span>
        )}
      </div>

      {showCart && (
        <div
          style={{
            position: "fixed",
            top: "90px",
            right: "10px",
            background: "white",
            color: "black",
            padding: "20px",
            zIndex: 1000,
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            width: "100%",
            maxWidth: "400px",
            maxHeight: "80vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #ddd",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    marginBottom: "10px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      marginRight: "15px",
                      borderRadius: "8px",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
                      {item.name}
                    </p>

                    <p style={{ margin: "0" }}>
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      style={{
                        backgroundColor: "#ddd",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      -
                    </button>
                    <span style={{ margin: "5px" }}>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      style={{
                        backgroundColor: "#ddd",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <p
                  style={{
                    margin: "0 0 10px 0",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  Total Price: ${getTotalPrice()}
                </p>
                <button
                  onClick={handleCheckout}
                  style={{
                    background: "linear-gradient(to right, orange, red, gray)",
                    color: "#fff",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: "200px",
                    margin: "0 auto",
                    display: "block",
                  }}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </CartContext.Provider>
  );
};

export { CartPage, CartContext };
