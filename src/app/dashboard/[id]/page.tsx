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
      router.push("/dashboard"); // Navigate back to the dashboard page
      alert("Delete success");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleBack = () => {
    router.push("/dashboard/product"); // Navigate back to the dashboard page
  };

  if (!post) {
    return <div></div>;
  }

  return (
    <div>
      <button
        onClick={handleBack}
        style={{
          backgroundColor: "white",
          border: "none",
          width: "50px",
          height: "50px",
          cursor: "pointer",
          borderRadius: "50%",
          boxSizing: "border-box",
        }}
      >
        <IoMdArrowBack style={{ width: "20px", height: "20px" }} />
      </button>
      <br />
      <div style={{ marginTop: "20px" }}>
        <div
          style={{ display: "flex", fontWeight: "bold", marginBottom: "10px" }}
        >
          <div style={{ flex: "1" }}>Image</div>
          <div style={{ flex: "2" }}>Name</div>
          <div style={{ flex: "1" }}>Price</div>
          <div style={{ flex: "4" }}>Description</div>
          <div style={{ flex: "1.5" }}>Actions</div>
        </div>
        <hr></hr>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
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
          <div style={{ flex: "2" }}>{post.name}</div>
          <div style={{ flex: "1", color: "red" }}>{post.price}$</div>
          <div style={{ flex: "4" }}>{post.description}</div>
          {/* <div style={{ flex: "4" }}>{post.category}</div> */}
          <div
            style={{ justifyContent: "space-between", marginRight: "100px" }}
          >
            <Link href={`/dashboard/edit?id=${id}`}>
              <CiEdit
                style={{
                  width: "30px",
                  height: "30px",
                  color: "orange",
                  marginLeft: "50px",
                }}
              />
            </Link>
            <button
              onClick={handleDelete}
              style={{
                color: "red",
                border: "none",

                cursor: "pointer",
              }}
            >
              <MdDeleteForever
                style={{ width: "30px", height: "30px", marginLeft: "10px" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
