"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/type/types";
import { PRODUCT_API_URL } from "@/lib/util";
import { FaCirclePlus } from "react-icons/fa6";

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
    return <div></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ marginLeft:'30px' }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Link href="/dashboard/add">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaCirclePlus
              style={{
                color: "#0099FF",
                width: "40px",
                height: "40px",
                marginRight: "10px",
                fontFamily: "roboto", // Thêm khoảng cách giữa icon và chữ
              }}
            />
            ADD Product
          </div>
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
          marginTop: "50px",
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
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    padding: "10px",
                    width: "100%",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "25px",
                      margin: "0 0 10px",
                      color: "#333",
                      fontFamily: "roboto",
                  
                    }}
                  >
                    {item.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {item.promotion ? (
                      <>
                        <span
                          style={{
                            fontSize: "1.1em",
                            color: "#666",
                            textDecoration: "line-through",
                          }}
                        >
                          {item.price}$
                        </span>
                        <span style={{ fontSize: "1.1em", color: "red" }}>
                          {item.promotion}$
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: "1.1em", color: "red" }}>
                        {item.price}$
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      color: "#666",
                      marginBottom: "10px",
                      fontFamily: "roboto",
                      fontSize:'18px'
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
      <style jsx>{`
        @media (max-width: 1200px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 992px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr;
          }

          div[style*="justify-content: space-between"] {
            flex-direction: column;
            align-items: center;
          }

          div[style*="background-color: orange"],
          div[style*="background-color: grey"] {
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default DataComponent;
