"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/type/types";
import { PRODUCT_API_URL } from "@/lib/util";
import { FcLike } from "react-icons/fc";
import home from '../../../public/home2.jpg'
import Image from "next/image";


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
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    fetchData()
      .then((data) => {
        const filteredData = data.filter((item: Product) => 
          item.name. toLowerCase().includes(searchQuery.toLowerCase())
        );
        setData(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [searchQuery]);

  const handleAddToFavorites = (item: Product) => {
    const savedProductIds = JSON.parse(localStorage.getItem("productIds") || "[]");
    const savedProducts: Product[] = JSON.parse(localStorage.getItem("products") || "[]");

    if (!savedProductIds.includes(item.id)) {
      savedProductIds.push(item.id);
      savedProducts.push(item);
      localStorage.setItem("productIds", JSON.stringify(savedProductIds));
      localStorage.setItem("products", JSON.stringify(savedProducts));
      alert("Added to favorites!");
      router.push("/product/favorite");
    }
  };

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
            <p style={{ fontSize: "1.1em", color: "#e67e22" }}>
              {item.price}$ 
              <FcLike 
                style={{ width:'35px',height:'35px',marginLeft:'200px',cursor: 'pointer' }}
                onClick={() => handleAddToFavorites(item)} 
              />
            </p>
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
      <style jsx>{`
        @media (max-width: 1200px) {
          div[style*='grid-template-columns: repeat(4, 1fr)'] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 900px) {
          div[style*='grid-template-columns: repeat(4, 1fr)'] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 600px) {
          div[style*='grid-template-columns: repeat(4, 1fr)'] {
            grid-template-columns: 1fr !important;
          }
          h1 {
            padding: 10px 20px !important;
            margin: 30px auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div>
      <div>
      <Image
          src={home}
          alt="Home"
          style={{ width:'100%',height:'auto' }}

        />
      </div>
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
        All PRODUCTS
      </h1>
      
      <DataComponent />
    </div>
  );
}
