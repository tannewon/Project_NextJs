"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/type/types";
import { PRODUCT_API_URL } from "@/lib/util";
import { FcLike } from "react-icons/fc";
import Image from "next/image";
import { IoStar } from "react-icons/io5";
import nen1 from "../../../public/nen3.jpg";
import nen2 from "../../../public/nen2.jpg";
import nike from "../../../public/Nike.png";
import adias from "../../../public/adidas.png";
import puma from "../../../public/pumalogo.png";
import person from "../../../public/person.png";
import { useTranslation } from "react-i18next";
import'@/i18n/i18n';

const fetchData = async () => {
  const res = await fetch(PRODUCT_API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
const images = [nen1, nen2]; // Danh sách các ảnh
const DataComponent = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const{ t } = useTranslation('product')

  useEffect(() => {
    fetchData()
      .then((data) => {
        const filteredData = data.filter((item: Product) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
    const savedProductIds = JSON.parse(
      localStorage.getItem("productIds") || "[]"
    );
    const savedProducts: Product[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

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
    return <div></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1
        style={{
          color: "#fff",
          backgroundColor: "#e67e22",
          width: "fit-content",
          margin: "50px auto",
          borderRadius: "8px",
          textAlign: "center",
          
          background: "linear-gradient(to right, orange, red, gray)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t('all categories')}
      </h1>
      <div
        style={{
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
              position: "relative",
            }}
          >
            <Link href={`/product/${item.id}`}>
              <span
                style={{
                  padding: " 10px",
                  backgroundColor: "red",
                  position: "absolute",
                  right: "0px",
                  top: "0px",
                  color: "white",
                }}
              >
                -10%
              </span>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "280px", objectFit: "cover" }}
              />
            </Link>
            <div style={{ padding: "16px" }}>
              <h3
                style={{
                  width:'200px',
                  margin: "0 0 10px",
                  color: "#333",
                  
                  fontSize: "25px",
                  background: "linear-gradient(to right, red, orange)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {item.name}
              </h3>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
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
                <FcLike
                  style={{
                    width: "30px",
                    height: "30px",
                    marginLeft: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAddToFavorites(item)}
                />
              </div>

              <div style={{ marginTop: "10px" }}>
                {[...Array(5)].map((_, index) => (
                  <IoStar
                    key={index}
                    style={{
                      margin: "0 2px",
                      color: "#FF9900",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                ))}
              </div>
              <p
                style={{
                  color: "#666",
                  marginBottom: "10px",
                  
                  fontSize: "18px",
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
        <style jsx>{`
          @media (max-width: 1200px) {
            div[style*="grid-template-columns: repeat(4, 1fr)"] {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }

          @media (max-width: 900px) {
            div[style*="grid-template-columns: repeat(4, 1fr)"] {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }

          @media (max-width: 600px) {
            div[style*="grid-template-columns: repeat(4, 1fr)"] {
              grid-template-columns: 1fr !important;
            }
            h1 {
              padding: 10px 20px !important;
              margin: 30px auto !important;
            }
          }
        `}</style>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "100px",
          marginTop: "50px",
          marginBottom:'50px',
        }}
      >
        <div>
          <Image
            style={{ borderRadius: "20px" }}
            src={nike}
            alt="Home"
            width={250}
            height={150}
          />
        </div>
        <div>
          <Image
            style={{ borderRadius: "20px" }}
            src={adias}
            alt="Home"
            width={250}
            height={150}
          />
        </div>
        <div>
          <Image
            style={{ borderRadius: "20px" }}
            src={person}
            alt="Home"
            width={250}
            height={150}
          />
        </div>
        <div>
          <Image
            style={{ borderRadius: "20px" }}
            src={puma}
            alt="Home"
            width={250}
            height={150}
          />
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const { t } = useTranslation('product');
  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "90vh",
          marginTop: "90px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "90vh",
            marginTop: "90px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              width: `${images.length * 100}%`,
              height: "100%",
              animation: "slide 15s linear infinite",
            }}
          >
            {images.concat(images).map((image, index) => (
              <div
                key={index}
                style={{
                  flexShrink: 0,
                  width: `${100 / images.length}%`,
                  height: "90%",
                  position: "relative",
                }}
              >
                <Image
                  src={image}
                  alt={`Home ${index}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "24px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "orange",
              
              fontSize: "70px",
              background: "linear-gradient(to right, orange, red, white)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t('shoes_p')} {" "}
          </h1>
          <p
            style={{
              textAlign: "center",
              background: "linear-gradient(to right, orange, white)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Website:shose.w.w.w.com
          </p>
          <div
            style={{
              display: "inline-block",
              paddingLeft: "100%",
              animation: "marquee 15s linear infinite",
              
              fontSize: "30px",
            }}
          >
            <h4>
              {t('text1')} {" "}
            </h4>
            <h4>
            {t('text2')} {" "}
            </h4>
          </div>
        </div>
      </div>
      <DataComponent />

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @media (max-width: 1200px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 900px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
