"use client";
// pages/dashboard/add/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(""); // State for image preview
  const [isUploading, setIsUploading] = useState(false); // New state for upload status

  const getUrlUpdateUserImg = async (file: File) => {
    const CLOUD_NAME = "dyfs9b4uj";
    const PRESET_NAME = "rymvqqtd";
    const FOLDER_NAME = "NextJs";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", file);
    const options = {
      method: "POST",
      body: formData,
    };
    try {
      const res = await fetch(api, options);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to upload image");
      }
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleImage = async (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Set image preview
      setIsUploading(true); // Start upload state
      try {
        const url = await getUrlUpdateUserImg(file);
        setImage(url);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image");
      } finally {
        setIsUploading(false); // End upload state
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://6520d2b6906e276284c4b174.mockapi.io/product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            image,
          }),
        }
      );
      if (res.ok) {
        router.push("/dashboard"); // Redirect back to dashboard after adding
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
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
            onChange={handleImage} 
            required 
            disabled={isUploading} // Disable input while uploading
          />
        </label>
        <br />
        {imagePreview && <img src={imagePreview} alt="Image preview" style={{ width: "200px", height: "200px" }} />} {/* Image preview */}
        <br />
        <button type="submit" disabled={isUploading || !image}> 
          {isUploading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
