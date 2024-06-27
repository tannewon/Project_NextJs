"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/dashboard.module.css";
import Link from "next/link";

const fetchData = async () => {
  const res = await fetch(
    "https://6520d2b6906e276284c4b174.mockapi.io/product"
  );
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return res.json();
};
const DataComponent = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  console.log(data);
  useEffect(() => {
    fetchData()
      .then((data) => {
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
        color: "orange",
        marginTop: "20px",
        backgroundColor: "beige",
        width: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        padding:'20px'
      }}
    >
      {data.map((item) => (
        <Link href={`/dashboard/${item.id}`} key={item.id}>
          <div className="">
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "300px", height: "250px" }}
            />
            <h3>{item.name}</h3>
            <p style={{ color:'red' }}>{item.price}$</p>
            <p>{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default function DashboardPage() {
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
}
