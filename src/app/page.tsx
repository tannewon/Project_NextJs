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
import { FcLike } from "react-icons/fc";
import { useRouter } from "next/navigation";

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
    return <div> </div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div className={styles.gridContainer}>
      {data.map((item) => (
        <div key={item.id} className={styles.card}>
          <img
            src={item.image}
            alt={item.name}
            className={styles.cardImage}
          />
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{item.name}</h3>
            <p style={{ fontSize: "1.1em", color: "#e67e22" }}>
              {item.price}$ 
              <FcLike 
                style={{ width:'35px',height:'35px',marginLeft:'200px',cursor: 'pointer' }}
                onClick={() => handleAddToFavorites(item)}
              />
            </p>
            <p className={styles.cardDescription}>{item.description}</p>
            <Link href={`/product/${item.id}`}>
              <button className={styles.cardButton}>Detail</button>
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
          alt="Home"
          className={styles.homeImage}
        />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Sports Shoes</h1>
        <div className={styles.imageGrid}>
          <Image
            src={anh1}
            alt="Product 1"
            className={styles.productImage}
          />
          <Image
            src={anh2}
            alt="Product 2"
            className={styles.productImage}
          />
        </div>
      </div>
      <div>
        <h1 className={styles.allProductTitle}>
          <Link href="/product">
            <div style={{ color:'white' }}>All Product</div>
          </Link>
        </h1>
        <DataComponent />
      </div>
      <style jsx>{`
        @media (max-width: 1200px) {
          .${styles.gridContainer} {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 900px) {
          .${styles.gridContainer} {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .${styles.gridContainer} {
            grid-template-columns: 1fr;
          }
          .${styles.title} {
            margin-left: 0;
            text-align: center;
          }
          .${styles.imageGrid} {
            flex-direction: column;
            gap: 20px;
          }
          .${styles.allProductTitle} {
            padding: 10px 20px;
            margin: 30px auto;
          }
        }
      `}</style>
    </div>
  );
}
