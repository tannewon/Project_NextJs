"use client";
import { AiFillAccountBook } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import anh5 from "../../public/anh5.jpg";
import anh6 from "../../public/anh6.jpg";
import nen1 from "../../public/nen3.jpg";
import nen2 from "../../public/nen2.jpg";
import nike from "../../public/Nike.png";
import adias from "../../public/adidas.png";
import puma from "../../public/pumalogo.png";
import person from "../../public/person.png";
import React, { useEffect, useState } from "react";
import { Product } from "@/type/types";
import { PRODUCT_API_URL } from "@/lib/util";
import { FcLike } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { IoStar } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import "@/i18n/i18n";

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
  const { t } = useTranslation("home");

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
      <h1
        className="text"
        style={{
          color: "white",
          width: "fit-content",
          margin: "0px auto",
          borderRadius: "8px",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "20px",

          background: "linear-gradient(to right, orange, red, gray)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "40px",
          textDecoration: "none",
        }}
      >
        <Link href="/product"> {t('all product')} </Link>
      </h1>

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

            <div style={{ padding: "16px", height: "155px" }}>
              <h3
                style={{
                  width: "200px",
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
    </div>
  );
};
export default function Home() {
  const { t } = useTranslation('home');
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
              background: "linear-gradient(to right, orange, red, white)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",

              fontSize: "70px",
              margin: 0,
            }}
          >
            {t('shoes_h')}
          </h1>
          <p
            style={{
              textAlign: "center",
              background: "linear-gradient(to right, orange, white)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Website: shose.w.w.w.com
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
            {t('text1')}
            </h4>
            <h4>
            {t('text2')}
            </h4>
          </div>
        </div>
      </div>

      {/* Phần nội dung chính */}
      <div
        style={{
          textAlign: "center",
          background: "linear-gradient(to right, orange, #FF4040, orange)",
          width: "90%", // Thay đổi từ px sang phần trăm
          height: "auto", // Thay đổi từ px sang auto
          margin: "10px auto",
          borderRadius: "20px",
          border: "5px solid white",
          marginTop: "20px",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "4rem", // Thay đổi từ px sang rem
            marginBottom: "2rem", // Thay đổi từ px sang rem
          }}
        >
          {t('sport shoes')}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "9rem", // Thay đổi từ px sang rem
            marginTop: "2rem", // Thay đổi từ px sang rem
            position: "relative",
            flexWrap: "wrap", // Allow items to wrap in smaller screens
          }}
        >
          <Link href="/shoes-sport">
            <div
              style={{
                position: "relative",
                width: "100%", // Thay đổi từ px sang phần trăm
                height: "auto", // Thay đổi từ px sang auto
                cursor: "pointer",
                margin: "10px",
              }}
            >
              <Image
                src={anh5}
                alt="Shoes Sport"
                objectFit="cover"
                style={{
                  borderRadius: "10px",
                  width: "330px",
                  height: "400px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px", // Thay đổi từ px sang rem
                  left: "10px",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "0.5rem 1rem", // Thay đổi từ px sang rem
                  borderRadius: "5px",
                  fontSize: "1.25rem", // Thay đổi từ px sang rem
                }}
                className="text"
              >
                {t('shoes sport')}
              </div>
            </div>
          </Link>

          <Link href="/shoes-casual">
            <div
              style={{
                position: "relative",
                width: "100%", // Thay đổi từ px sang phần trăm
                height: "auto", // Thay đổi từ px sang auto
                cursor: "pointer",
                margin: "10px",
              }}
            >
              <Image
                src={anh6}
                alt="Shoes Casual"
                objectFit="cover"
                style={{
                  borderRadius: "10px",
                  width: "330px",
                  height: "400px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px", // Thay đổi từ px sang rem
                  left: "10px",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "0.5rem 1rem", // Thay đổi từ px sang rem
                  borderRadius: "5px",
                  fontSize: "1.25rem", // Thay đổi từ px sang rem
                }}
                className="text"
              >
                {t('shoes casual')}
              </div>
            </div>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: "2rem", // Thay đổi từ px sang rem
            justifyContent: "center",
            flexWrap: "wrap", // Allow items to wrap in smaller screens
          }}
        >
          <div
            style={{
              width: "100%", // Thay đổi từ px sang phần trăm
              maxWidth: "600px", // Giới hạn chiều rộng tối đa
              marginTop: "2rem", // Thay đổi từ px sang rem
              fontSize: "1.25rem", // Thay đổi từ px sang rem
              color: "white",
            }}
          >
            <h1>{t('title1')}</h1>
            <p>
            {t('title2')}
            </p>
          </div>
          <div
            style={{
              width: "100%", // Thay đổi từ px sang phần trăm
              maxWidth: "600px", // Giới hạn chiều rộng tối đa
              marginTop: "2rem", // Thay đổi từ px sang rem
              fontSize: "1.25rem", // Thay đổi từ px sang rem
              color: "white",
            }}
          >
            <h1>{t('title3')}</h1>
            <p>
            {t('title4')}
            </p>
          </div>
        </div>
      </div>

      <h2
        style={{
          marginTop: "40px",
          marginLeft: "160px",
        }}
      >
        Brand
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "130px",
          marginTop: "50px",
          flexWrap: "wrap", // Allow items to wrap in smaller screens
        }}
      >
        <div>
          <Image
            style={{ borderRadius: "20px" }}
            src={nike}
            alt="Nike"
            width={200}
            height={150}
          />
        </div>
        <div>
          <Image
            style={{ borderRadius: "20px" }}
            src={adias}
            alt="Adidas"
            width={200}
            height={150}
          />
        </div>
        <div>
          <Image
            style={{ borderRadius: "20px" }}
            src={person}
            alt="Person"
            width={200}
            height={150}
          />
        </div>
        <div>
          <Image
            style={{ borderRadius: "20px" }}
            src={puma}
            alt="Puma"
            width={200}
            height={150}
          />
        </div>
      </div>

      {/* Phần liên kết đến sản phẩm */}
      <div>
        <DataComponent />
      </div>

      <style jsx>{`
        .font:hover {
          color: red !important;
        }
        .text:hover {
          color: red !important;
        }

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

        @keyframes marquee {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          div[style*="width: 1350px;"] {
            width: 100%;
          }

          div[style*="width: 550px;"] {
            width: 100%;
            height: auto;
          }
        }

        @media (max-width: 768px) {
          div[style*="width: 1350px;"] {
            width: 100%;
          }

          div[style*="width: 550px;"] {
            width: 100%;
            height: auto;
          }

          h1 {
            font-size: 40px;
          }

          h2 {
            font-size: 30px;
          }

          .link-container {
            width: 100%;
            height: auto;
            margin: 10px 0;
            display: flex;
            flex-direction: column; /* Sắp xếp các mục trong giỏ hàng theo cột */
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 30px;
          }

          h2 {
            font-size: 20px;
          }

          div[style*="width: 1350px;"] {
            width: 100%;
          }

          .link-container {
            width: 100%;
            height: auto;
            margin: 10px 0;
          }

          .text {
            font-size: 16px;
          }

          .font {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
