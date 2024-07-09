// Home.tsx
"use client";
import { AiFillAccountBook } from "react-icons/ai";
import Link from "next/link";
import styles from "../styles/home.module.css";
import Image from "next/image";
import home from "../../public/home2.jpg";
import anh1 from "../../public/anh1.jpg";
import anh2 from "../../public/anh2.jpg";

import React, { useEffect, useState } from "react";
import { Product } from "@/type/types";
import { PRODUCT_API_URL } from "@/lib/util";

const fetchData = async () => {
  const res = await fetch(PRODUCT_API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const DataComponent = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData()
      .then((data) => {
        // Assuming API returns an array of products
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      style={{
        marginTop: "100px",
        backgroundColor: "#f5f5f5",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        padding: "20px",
      }}
    >
      {data.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <div style={{ padding: "16px" }}>
            <h3
              style={{
                fontSize: "1.2em",
                margin: "0 0 10px",
                color: "#333",
              }}
            >
              {item.name}
            </h3>
            <p style={{ fontSize: "1.1em", color: "#e67e22" }}>{item.price}$</p>
            <p style={{ color: "#666", marginBottom: "10px" }}>
              {item.description}
            </p>
            <Link href={`/product/${item.id}`}>
              <button
                style={{
                  backgroundColor: "#e67e22",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "center",
                  display: "block",
                  width: "100%",
                }}
              >
                Detail
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <div>
        <Image
          src={home}
          alt="Description of the image"
          style={{ width: "100%", height: "auto", marginBottom: "50px" }}
        />
      </div>
      <div className={styles.container}>
        <h1 style={{ marginLeft:'370px',color:'orange',fontSize: "50px" }}>Sports Shoes</h1>
        <div className="container text-center">
          <div className="row"style={{ display:'flex', gap:'30px' }}>
            <div className="col">
              <Image
                src={anh1}
                alt="Description of the image"
                style={{ width: "100%", height: "auto", marginBottom: "50px" }}
              />
            </div>
            <div className="col"> <Image
                src={anh2}
                alt="Description of the image"
                style={{ width: "100%", height: "auto", marginBottom: "50px" }}
              /></div>
          </div>
        </div>
      </div>
      <div>
        <h1
          style={{
            color: "#fff",
            backgroundColor: "#e67e22",
            width: "fit-content",
            padding: "20px 40px",
            margin: "50px auto",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Link href="/product" style={{ color: "white" }}>
            <div>All Product</div>
          </Link>
        </h1>
        <DataComponent />
      </div>
    </div>
  );
}
