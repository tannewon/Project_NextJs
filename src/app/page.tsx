"use client";
import { AiFillAccountBook } from "react-icons/ai";
import Link from "next/link";
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
    return <div></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '20px', backgroundColor: '#f5f5f5', marginTop: '100px' }}>
      {data.map((item) => (
        <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s' }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '1.2em', margin: '0 0 10px', color: '#333' }}>{item.name}</h3>
            <p style={{ fontSize: '1.1em', color: '#e67e22' }}>
              {item.price}$ 
              <FcLike
                style={{ width: '30px', height: '30px', marginLeft: '200px', cursor: 'pointer' }}
                onClick={() => handleAddToFavorites(item)}
              />
            </p>
            <p style={{ color: '#666', marginBottom: '10px' }}>{item.description}</p>
            <Link href={`/product/${item.id}`}>
              <button style={{ backgroundColor: '#e67e22', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', textAlign: 'center', display: 'block', width: '100%' }}>Detail</button>
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
          style={{ width: '100%', height: 'auto', marginBottom: '50px' }}
        />
      </div>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ color: 'orange', fontSize: '50px', marginBottom: '30px' }}>Sports Shoes</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '50px' }}>
          <Image
            src={anh1}
            alt="Product 1"
            style={{ width: '80%', height: 'auto' }}
          />
          <Image
            src={anh2}
            alt="Product 2"
            style={{ width: '80%', height: 'auto' }}
          />
        </div>
      </div>
      <div>
        <h1 style={{ color: '#fff', backgroundColor: '#e67e22', width: 'fit-content', padding: '20px 40px', margin: '50px auto', borderRadius: '8px', textAlign: 'center' }}>
          <Link href="/product">
            <div style={{ color: 'white' }}>All Product</div>
          </Link>
        </h1>
        <DataComponent />
      </div>
      <style jsx>{`
        @media (max-width: 1200px) {
          div[style*="grid-template-columns: repeat(4, 1fr);"] {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 900px) {
          div[style*="grid-template-columns: repeat(4, 1fr);"] {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(4, 1fr);"] {
            grid-template-columns: 1fr;
          }
          h1[style*="color: orange; font-size: 50px;"] {
            margin-left: 0;
            text-align: center;
          }
          div[style*="display: flex; justify-content: center;"] {
            flex-direction: column;
            gap: 20px;
          }
          h1[style*="color: #fff; background-color: #e67e22;"] {
            padding: 10px 20px;
            margin: 30px auto;
          }
        }
      `}</style>
    </div>
  );
}
