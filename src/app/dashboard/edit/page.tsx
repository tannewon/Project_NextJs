"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCT_API_URL } from "@/lib/util";

const fetchPost = async (id: string) => {
  const res = await fetch(
    `${PRODUCT_API_URL}/${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

const updatePost = async (id: string, data: any) => {
  const res = await fetch(
    `${PRODUCT_API_URL}/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error("Failed to update data");
  return res.json();
};

const uploadImage = async (file: File) => {
  const CLOUD_NAME = "dyfs9b4uj";
  const PRESET_NAME = "rymvqqtd";
  const FOLDER_NAME = "NextJs";
  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("upload_preset", PRESET_NAME);
  formData.append("folder", FOLDER_NAME);
  formData.append("file", file);
  const res = await fetch(api, { method: "POST", body: formData });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Failed to upload image");
  return data.secure_url;
};

export default function EditProductPage() {
  const [post, setPost] = useState<any>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setIsUploading(true);
      try {
        const url = await uploadImage(file);
        setImage(url);
      } catch (error) {
        alert("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost(id)
        .then((data) => {
          setPost(data);
          setName(data.name);
          setPrice(data.price);
          setDescription(data.description);
          setImage(data.image);
          setImagePreview(data.image);
        })
        .catch((error) => console.error("Failed to fetch post data:", error));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePost(id!, { name, price, description, image });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update post data:", error);
    }
  };

  if (!post) return <div></div>;

  return (
    <div>
      <h2 style={{ color: "orange", marginLeft: "520px" }}>Edit Product</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid orange",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "400px",
          margin: "0 auto",
          marginTop: "30px",
        }}
      >
        <label style={{ marginBottom: "10px", display: "block" }}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "10px",
              border: "1px solid orange",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>
        <br />
        <label style={{ marginBottom: "10px", display: "block" }}>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "10px",
              border: "1px solid orange",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>
        <br />
        <label style={{ marginBottom: "10px", display: "block" }}>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "10px",
              border: "1px solid orange",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>
        <br />
        <label style={{ marginBottom: "10px", display: "block" }}>
          Image:
          <input
            type="file"
            onChange={handleImageChange}
            disabled={isUploading}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "10px",
              border: "1px solid orange",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>
        <br />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Image preview"
            style={{ width: "200px", height: "200px" }}
          />
        )}
        <br />
        <button
          type="submit"
          disabled={isUploading || !image}
          style={{
            backgroundColor: "orange",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          {isUploading ? "Uploading..." : "Save"}
        </button>
        <Link href={`/dashboard/${id}`}>
          <button
            style={{
              backgroundColor: "grey",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
              marginLeft: "250px",
            }}
          >
            Back
          </button>
        </Link>
      </form>
    </div>
  );
}
