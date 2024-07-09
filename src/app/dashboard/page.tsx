// pages/dashboard/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/type/types";
import { PRODUCT_API_URL } from "@/lib/util";
import withAuth from "../withAuth";


const fetchData = async () => {
  const res = await fetch(PRODUCT_API_URL);
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return res.json();
};

const DataComponent = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData()
      .then((data: Product[]) => {
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
        marginTop: "20px",
        backgroundColor: "beige",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        padding: "20px",
      }}
    >
      {data.map((item) => (
        <Link href={`/dashboard/${item.id}`} key={item.id}>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                padding: "16px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2em",
                  margin: "0 0 10px",
                  color: "#333",
                }}
              >
                {item.name}
              </h3>
              <p
                style={{
                  fontSize: "1.1em",
                  color: "#e67e22",
                }}
              >
                {item.price}$
              </p>
              <p
                style={{
                  color: "#666",
                  marginBottom: "10px",
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div>
      <h1
        style={{
          color: "orange",
          backgroundColor: "green",
          width: "600px",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "200px",
        }}
      >
        All List Nine Dev
      </h1>
      <Link href="/dashboard/add">
        <button
          style={{
            backgroundColor: "orange",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "4px",
            marginLeft: "450px",
          }}
        >
          ADD Product
        </button>
      </Link>
      <DataComponent />
    </div>
  );
};

export default withAuth(DashboardPage, ["admin"]);
