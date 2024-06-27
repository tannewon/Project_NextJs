"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

async function getPost(id: string) {
  const res = await fetch(
    `https://6520d2b6906e276284c4b174.mockapi.io/product/${id}`
  );
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return res.json();
}
async function deletePost(id: string) {
  const res = await fetch(
    `https://6520d2b6906e276284c4b174.mockapi.io/product/${id}`,
    { method: 'DELETE' }
  );
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
        console.error('Failed to fetch post data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      router.push('/dashboard'); // Navigate back to the dashboard page
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };
  const handleBack = () => {
    router.push('/dashboard'); // Navigate back to dashboard page
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        src={post.image}
        alt={post.name}
        style={{ width: "300px", height: "200px" }}
      />
      <br />
      <Link href={`/dashboard/edit?id=${id}`}>
      <button style={{ marginRight: '30px', backgroundColor: "yellow", marginTop: "20px" }}>
        Edit
      </button>
      </Link>
      <button onClick={handleDelete} style={{ marginRight: '30px', backgroundColor: "red" }}>
        Delete
      </button>
      <button onClick={handleBack} style={{ marginLeft: '100px', backgroundColor: "blue" }}>
        Back
      </button>
      <h1>{post.name}</h1>
      <p>{post.description}</p>
    </div>
  );
}
