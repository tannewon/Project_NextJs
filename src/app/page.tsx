"use client";
import { AiFillAccountBook } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import home from "../../public/home2.jpg";
import anh5 from "../../public/anh5.jpg";
import anh6 from "../../public/anh6.jpg";
import nen1 from "../../public/nen3.jpg";
import nen2 from "../../public/nen2.jpg";
import React, { useEffect, useState } from "react";
import { Product } from "@/type/types";
import { PRODUCT_API_URL } from "@/lib/util";
import { FcLike } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { IoStar } from "react-icons/io5";

const fetchData = async () => {
  const res = await fetch(PRODUCT_API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
const images = [home, nen1, nen2]; // Danh sách các ảnh

const DataComponent = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

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
    <div style={{}}>
      <h2
        style={{
          color: "#fff",
          backgroundColor: "#e67e22",
          width: "fit-content",
          padding: "10px 20px",
          margin: "0px auto",
          borderRadius: "8px",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "20px",
        }}
      >
        <Link href="/product">
          <div style={{ fontFamily: "roboto", color: "white" }}>
            All Product
          </div>
        </Link>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
          padding: "20px",
          marginTop: "30px",
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
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
            </Link>

            <div style={{ padding: "16px" }}>
              <h3
                style={{
                  margin: "0 0 10px",
                  color: "#333",
                  fontFamily: "roboto",
                  fontSize: "25px",
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
                  fontFamily: "roboto",
                  fontSize: "18px",
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      {/* Phần ảnh chính với chữ chạy */}
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
                  height: "100%",
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
              fontFamily: "roboto",
              fontSize: "70px",
            }}
          >
            Shoes with Shop www.com{" "}
          </h1>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Website:shose.w.w.w.com
          </p>
          <div
            style={{
              display: "inline-block",
              paddingLeft: "100%",
              animation: "marquee 15s linear infinite",
              fontFamily: "roboto",
              fontSize: "30px",
            }}
          >
            <h4>
              The Evolution of Sneakers support, and durability. Brands like
              Converse{" "}
            </h4>
            <h4>
              Sneakers in the Fashion Industry support, and durability. Brands
              like Converse{" "}
            </h4>
          </div>
        </div>
      </div>

      {/* Phần nội dung chính */}
      <div
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "orange",
          width: "1350px",
          height: "800px",
          margin: "10px auto",
          borderRadius: "20px",
          border: "5px solid white",
          marginTop: "50px",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "50px",
            marginBottom: "30px",
            fontFamily: "Roboto",
          }}
        >
          Sports Shoes
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "100px",
            marginTop: "50px",
            position: "relative",
          }}
        >
          <Link href="/shoes-sport">
            <div
              style={{
                position: "relative",
                width: "550px",
                height: "400px",
                cursor: "pointer",
              }}
              className="link-container"
            >
              <Image
                src={anh5}
                alt="Shoes Sport"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "10px" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "100px",
                  left: "10px",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "20px",
                  fontFamily: "roboto",
                }}
              >
                Shoes Sport
              </div>
            </div>
          </Link>

          <Link href="/shoes-casual">
            <div
              style={{
                position: "relative",
                width: "550px",
                height: "400px",
                cursor: "pointer",
              }}
              className="link-container"
            >
              <Image
                src={anh6}
                alt="Shoes Casual"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "10px" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "100px",
                  left: "10px",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "20px",
                  fontFamily: "roboto",
                }}
              >
                Shoes Casual
              </div>
            </div>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: "50px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "600px",
              marginTop: "20px",
              fontFamily: "Roboto",
              fontSize: "20px",
              color: "white",
            }}
          >
            <h1>The Evolution of Sneakers</h1>
            <p>
              The journey of sneakers from athletic wear to everyday fashion
              essentials is a fascinating one. Originally designed for sports
              and physical activities, sneakers were engineered to provide
              comfort
            </p>
          </div>
          <div
            style={{
              width: "600px",
              marginTop: "20px",
              fontFamily: "Roboto",
              fontSize: "20px",
              color: "white",
            }}
          >
            <h1>The Evolution of Sneakers</h1>
            <p>
              The journey of sneakers from athletic wear to everyday fashion
              essentials is a fascinating one. Originally designed for sports
              and physical activities, sneakers were engineered to provide
              comfort
            </p>
          </div>
        </div>
      </div>

      {/* Phần liên kết đến sản phẩm */}
      <div>
        <DataComponent />
      </div>

      <style jsx>{`
        .link-container:hover {
          background-color: rgba(0, 0, 255, 0.3); /* Màu xanh nhạt khi hover */
        }

        .link-container:active {
          background-color: rgba(
            0,
            0,
            255,
            0.5
          ); /* Màu xanh đậm hơn khi nhấn */
        }
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @media (min-width: 768px) {
          /* Điều chỉnh thời gian animation tùy thuộc vào số lượng ảnh và tốc độ di chuyển */
          .slide-animation {
            animation: slide 9s linear infinite;
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

        /* Responsive Styles for DataComponent */
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: repeat(4, 1fr);"] {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 800px) {
          div[style*="grid-template-columns: repeat(4, 1fr);"] {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(4, 1fr);"] {
            grid-template-columns: 1fr;
          }
          h1[style*="color: orange; font-size: 50px;"] {
            margin: 0;
            text-align: center;
            font-size: 30px;
          }
          div[style*="display: flex; justify-content: center;"] {
            flex-direction: column;
            gap: 20px;
          }
          h1[style*="color: #fff; background-color: #e67e22;"] {
            padding: 10px 20px;
            margin: 20px auto;
            font-size: 20px;
          }
          img[style*="width: 100%; height: 200px;"] {
            height: 150px;
          }
          .product-description {
            font-size: 16px;
          }
        }
        @media (max-width: 480px) {
          h1[style*="color: orange; font-size: 50px;"] {
            font-size: 25px;
          }
          div[style*="display: flex; justify-content: center;"] {
            gap: 10px;
          }
          h1[style*="color: #fff; background-color: #e67e22;"] {
            font-size: 18px;
          }
          img[style*="width: 100%; height: 200px;"] {
            height: 100px;
          }
          .product-description {
            font-size: 14px;
          }
        }
        @media (max-width: 320px) {
          h1[style*="color: orange; font-size: 50px;"] {
            font-size: 20px;
          }
          div[style*="display: flex; justify-content: center;"] {
            gap: 5px;
          }
          h1[style*="color: #fff; background-color: #e67e22;"] {
            font-size: 16px;
          }
          img[style*="width: 100%; height: 200px;"] {
            height: 80px;
          }
          .product-description {
            font-size: 12px;
          }
        }
        @media (min-width: 1025px) {
          div[style*="grid-template-columns: repeat(4, 1fr);"] {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
