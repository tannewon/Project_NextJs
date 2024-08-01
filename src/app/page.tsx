"use client";
import { AiFillAccountBook } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import home from "../../public/home2.jpg";
import anh5 from "../../public/anh5.jpg";
import anh6 from "../../public/anh6.jpg";
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "30px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        marginTop: "100px",
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
          <Link href={`/product/${item.id}`}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />

            <div style={{ padding: "16px" }}>
              <h3
                style={{ fontSize: "1.2em", margin: "0 0 10px", color: "#333" }}
              >
                {item.name}
              </h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "1.1em", color: "red" }}>
                  {item.price}$
                </span>
                <FcLike
                  style={{
                    width: "30px",
                    height: "30px",
                    marginLeft: "200px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAddToFavorites(item)}
                />
              </div>

              <div style={{ marginTop: "10px", }}>
                {[...Array(5)].map((_, index) => (
                  <IoStar
                    key={index}
                    style={{ margin: "0 2px", color: "#FF9900", width: "20px",
                      height: "20px"}}
                  />
                ))}
              </div>
              <p style={{ color: "#666", marginBottom: "10px" }}>
                {item.description}
              </p>
            </div>
          </Link>
        </div>
      ))}
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
        <Image
          src={home}
          alt="Home"
          layout="fill"
          objectFit="cover"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
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
              fontSize: "100px",
            }}
          >
            Shoes with Shop www.com{" "}
          </h1>
          <p style={{
              textAlign: "center",
            }}>Website:shose.w.w.w.com</p>
          <div
            style={{
              display: "inline-block",
              paddingLeft: "100%",
              animation: "marquee 15s linear infinite",
            }}
          >
            <h2>
              The Evolution of Sneakers support, and durability. Brands like
              Converse{" "}
            </h2>
            <h2>
              Sneakers in the Fashion Industry support, and durability. Brands
              like Converse{" "}
            </h2>
          </div>
        </div>
      </div>

      {/* Phần nội dung chính */}
      <div style={{ textAlign: "center", padding: "30px" }}>
        <h1 style={{ color: "orange", fontSize: "50px", marginBottom: "30px" }}>
          Sports Shoes
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "150px",
            marginBottom: "50px",
          }}
        >
          <Image
            src={anh5}
            alt="Product 1"
            width={500}
            height={500}
            style={{ objectFit: "cover" }} // Đảm bảo ảnh không bị kéo dãn
          />
          <div
            style={{
              width: "500px",
              marginTop: "20px",
              fontFamily: "roboto",
              fontSize: "20px",
            }}
          >
            <h1>The Evolution of Sneakers</h1>
            <p>
              The journey of sneakers from athletic wear to everyday fashion
              essentials is a fascinating one. Originally designed for sports
              and physical activities, sneakers were engineered to provide
              comfort, support, and durability. Brands like Converse, Adidas,
              and Nike began producing sneakers specifically for sports such as
              basketball, running, and tennis in the early to mid-20th century.
              However, it wasn't long before these shoes started making their
              way into the casual wardrobes of people around the world.
              <br />
              By the 1980s, sneakers had become a significant part of youth
              culture, heavily influenced by hip-hop and streetwear movements.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "150px",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              width: "500px",
              marginTop: "20px",
              fontFamily: "roboto",
              fontSize: "20px",
            }}
          >
            <h1>Sneakers in the Fashion Industry</h1>
            <p>
              The journey of sneakers from athletic wear to everyday fashion
              essentials is a fascinating one. Originally designed for sports
              and physical activities, sneakers were engineered to provide
              comfort, support, and durability. Brands like Converse, Adidas,
              and Nike began producing sneakers specifically for sports such as
              basketball, running, and tennis in the early to mid-20th century.
              However, it wasn't long before these shoes started making their
              way into the casual wardrobes of people around the world.
              <br />
              By the 1980s, sneakers had become a significant part of youth
              culture, heavily influenced by hip-hop and streetwear movements.
              Icons like Run-D.M.C., with their famous endorsement of Adidas
              Superstar sneakers
            </p>
          </div>
          <Image
            src={anh6}
            alt="Product 2"
            width={500}
            height={500}
            style={{ objectFit: "cover" }} // Đảm bảo ảnh không bị kéo dãn
          />
        </div>
      </div>

      {/* Phần liên kết đến sản phẩm */}
      <div>
        <h1
          style={{
            color: "#fff",
            backgroundColor: "#e67e22",
            width: "fit-content",
            padding: "15px 30px",
            margin: "0px auto",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Link href="/product">
            <div style={{ color: "white" }}>All Product</div>
          </Link>
        </h1>
        <DataComponent />
      </div>

      <style jsx>{`
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
