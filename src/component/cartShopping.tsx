"use client"
import React, { useState, useEffect, createContext, useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';

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
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map(cartItem =>
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
    const updatedCartItems = cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    setShowCart(false);
    router.push('/payment');
  };

  return (
    <CartContext.Provider value={{ addToCart }}>
      <FaShoppingCart 
        style={{ marginLeft: "20px", width: '25px', height: '25px', cursor: 'pointer' }}
        onClick={handleToggleCart}
      />
      {getTotalItems() > 0 && (
        <span
          style={{
            marginLeft: "5px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "14px",
          }}
        >
          {getTotalItems()}
        </span>
      )}
      {showCart && (
        <div
          style={{
            position: "fixed",  
            top: "90px",
            right: "10px",
            background: "white",
            color: "black",
            height:'none',
            padding:'20px',
            zIndex: 1000,
            boxShadow: "0 0 10px rgba(0,0,0,0.2)"
          }}
        >
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <table
                style={{
                  width: "100%",
                  marginTop: "20px",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <th style={{ padding: "10px", textAlign: "left" }}>Image</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Quantity</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Price</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.id}
                      style={{ borderBottom: "1px solid #ddd" }}
                    >
                      <td style={{ padding: "10px" }}>
                        <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px" }} />
                      </td>
                      <td style={{ padding: "10px" }}>{item.name}</td>
                      <td style={{ padding: "10px" }}>
                        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      </td>
                      <td style={{ padding: "10px" }}>{(item.price * item.quantity).toFixed(2)}$</td>
                      <td style={{ padding: "10px" }}>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          style={{
                            backgroundColor: "#e74c3c",
                            color: "#fff",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {cartItems.length > 0 && (
                <>
                  <p>Total Price: ${getTotalPrice()}</p>
                  <button
                    onClick={handleCheckout}
                    style={{
                      marginTop: "20px",
                      backgroundColor: "#3498db",
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginLeft:'170px'
                    }}
                  >
                    Checkout
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </CartContext.Provider>
  );
};

export { CartPage, CartContext };
