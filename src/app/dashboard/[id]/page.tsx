"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

async function getPost(id: string) {
  const res = await fetch(
    `https://6520d2b6906e276284c4b174.mockapi.io/product/${id}`
  );
  if (!res.ok) {
    throw new Error("Fail to fetch data");
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

  const handleEdit = () => {
    // Logic for handling edit action
    router.push('/dashboard/edit')
  };

  const handleDelete = () => {
    // Logic for handling delete action
    console.log('Delete button clicked');
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
      <button onClick={handleEdit} style={{ marginRight: '30px', backgroundColor: "yellow", marginTop: "20px" }}>
        Edit
      </button>
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
