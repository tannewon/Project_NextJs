"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const fetchPost = async (id: string) => {
  const res = await fetch(
    `https://6520d2b6906e276284c4b174.mockapi.io/product/${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

const updatePost = async (id: string, data: any) => {
  const res = await fetch(
    `https://6520d2b6906e276284c4b174.mockapi.io/product/${id}`,
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
      await updatePost(id!, { name, description, image });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update post data:", error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="file"
            onChange={handleImageChange}
            disabled={isUploading}
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
        <button type="submit" disabled={isUploading || !image}>
          {isUploading ? "Uploading..." : "Save"}
        </button>
      </form>
    </div>
  );
}
