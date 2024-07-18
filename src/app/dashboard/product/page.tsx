"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

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

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Link href="/dashboard/add">
          <div
            style={{
              backgroundColor: "orange",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            ADD Product
          </div>
        </Link>
        <div
          onClick={() => router.push("/dashboard")}
          style={{
            backgroundColor: "grey",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "4px",
            display: "inline-block",
            textDecoration: "none",
          }}
        >
          BACK
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          marginTop: '50px',
        }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
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
                  cursor: "pointer",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "300px",
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
          ))
        ) : (
          <div style={{ gridColumn: "span 3", textAlign: "center" }}>
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default DataComponent;
