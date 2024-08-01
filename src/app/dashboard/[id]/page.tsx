"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PRODUCT_API_URL } from "@/lib/util";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";

async function getPost(id: string) {
  const res = await fetch(`${PRODUCT_API_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function deletePost(id: string) {
  const res = await fetch(`${PRODUCT_API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Failed to delete data");
  }
  return res.json();
}

export default function DashboardDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [post, setPost] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getPost(id);
        setPost(postData);
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      router.push("/dashboard/product"); // Navigate back to the dashboard page
      alert("Delete success");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleBack = () => {
    router.push("/dashboard/product"); // Navigate back to the product page
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "10px 50px 350px", margin: 0 }}>
      <button
        onClick={handleBack}
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          width: "50px",
          height: "50px",
          cursor: "pointer",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <IoMdArrowBack style={{ width: "20px", height: "20px" }} />
      </button>
      <div style={{ marginTop: "10px" }}>
        <div
          style={{ display: "flex", fontWeight: "bold", marginBottom: "10px" }}
        >
          <div style={{ fontWeight: "bold", padding: "10px" }}>Image</div>
          <div
            style={{ fontWeight: "bold", padding: "10px", marginLeft: "60px" }}
          >
            Name
          </div>
          <div
            style={{ fontWeight: "bold", padding: "10px", marginLeft: "190px" }}
          >
            Price
          </div>
          <div
            style={{ fontWeight: "bold", padding: "10px", marginLeft: "70px" }}
          >
            Description
          </div>
          <div
            style={{ fontWeight: "bold", padding: "10px", marginLeft: "380px" }}
          >
            Actions
          </div>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div style={{ flex: "1" }}>
            <img
              src={post.image}
              alt={post.name}
              style={{
                width: "100px",
                height: "auto",
                objectFit: "contain",
                borderRadius: "10px",
              }}
            />
          </div>
          <div style={{ flex: "2", padding: "0 10px" }}>{post.name}</div>
          <div style={{ flex: "1", color: "red" }}>{post.price}$</div>
          <div style={{ flex: "4", padding: "0 10px" }}>{post.description}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link href={`/dashboard/edit?id=${id}`}>
              <CiEdit
                style={{
                  width: "25px",
                  height: "25px",
                  color: "orange",
                  cursor: "pointer",
                }}
              />
            </Link>
            <button
              onClick={handleDelete}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 15px",
              }}
            >
              <MdDeleteForever
                style={{ width: "25px", height: "25px", color: "red" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
