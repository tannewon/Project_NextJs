"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PRODUCT_API_URL } from "@/lib/util";

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
    router.push("/dashboard"); // Navigate back to the dashboard page
  };

  if (!post) {
    return <div> </div>;
  }

  return (
    <div style={{ marginLeft: "250px" }}>
      <img
        src={post.image}
        alt={post.name}
        style={{ width: "70%", height: "600px" }}
      />
      <br />
      <div
        style={{
          backgroundColor: "Orange",
          width: "480px",
          height: "250px",
          padding: '10px'
        }}
      >
        <Link href={`/dashboard/edit?id=${id}`}>
          <button
            style={{
              marginRight: "30px",
              backgroundColor: "yellow",
              marginTop: "20px",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Edit
          </button>
        </Link>
        <button
          onClick={handleDelete}
          style={{
            marginRight: "30px",
            backgroundColor: "red",
            marginTop: "20px",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Delete
        </button>
        <button
          onClick={handleBack}
          style={{
            backgroundColor: "gray",
            marginTop: "20px",
            marginLeft: '200px',
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Back
        </button>
        <h1>{post.name}</h1>
        <p style={{ color: 'red' }}>{post.price}$</p>
        <p>{post.description}</p>
      </div>
    </div>
  );
}
