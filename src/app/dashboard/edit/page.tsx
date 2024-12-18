"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCT_API_URL } from "@/lib/util";
import { IoMdArrowBack } from "react-icons/io";

const fetchPost = async (id: string) => {
  const res = await fetch(`${PRODUCT_API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

const updatePost = async (id: string, data: any) => {
  const res = await fetch(`${PRODUCT_API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
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
  const [promotion, setPromotion] = useState(""); // Added promotion state
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
          setPromotion(data.promotion); // Set promotion field
          setImage(data.image);
          setImagePreview(data.image);
        })
        .catch((error) => console.error("Failed to fetch post data:", error));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePost(id!, { name, price, description, promotion, image }); // Include promotion in update
      router.push("/dashboard/product");
    } catch (error) {
      console.error("Failed to update post data:", error);
    }
  };

  if (!post) return <div></div>;

  return (
    <div style={{ marginLeft: "30px",marginTop:'30px' }}>
      <Link href={`/dashboard/${id}`}>
        <button
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            width: "50px",
            height: "50px",
            cursor: "pointer",
            borderRadius: "50%",
            boxSizing: "border-box",
          }}
          className="back"
        >
          <IoMdArrowBack style={{ width: "20px", height: "20px" }} />
        </button>
      </Link>
      <h2 style={{ color: "orange", textAlign: "center" }}>Edit Product</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid orange",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "550px",
          margin: "0 auto",
          marginTop: "20px",
        }}
      >
        <label style={{ display: "block" }}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              height: "40px",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid orange",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>
        <br />
        <label style={{ display: "block" }}>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{
              width: "100%",
              height: "40px",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid orange",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>
        <br />
        <label style={{ display: "block" }}>
          Promotion:
          <input
            type="text"
            value={promotion}
            onChange={(e) => setPromotion(e.target.value)} // Handle promotion change
            style={{
              width: "100%",
              height: "40px",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid orange",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <br />
        <label style={{ display: "block" }}>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              width: "100%",
              height: "80px",
              padding: "8px",
              marginTop: "5px",
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
              height: "40px",
              padding: "8px",
              marginTop: "5px",
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
            style={{ width: "100px", height: "100px", borderRadius: "10px" }}
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
            marginLeft: "420px",
            marginTop: "20px",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "4px",
            width: "20%",
            boxSizing: "border-box",
          }}
        >
          {isUploading ? "Uploading..." : "Save"}
        </button>
      </form>
      <style jsx>{`

      

    
        .back:hover {
        color: red;

     
        @media (max-width: 768px) {
          form {
            width: 100%;
            padding: 15px;
          }

          button {
            width: 100%;
          }

          h2 {
            font-size: 1.5em;
          }

          label {
            font-size: 1em;
          }

          img {
            width: 100%;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
}
