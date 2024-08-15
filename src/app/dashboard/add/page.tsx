"use client";
// pages/dashboard/add/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT_API_URL } from "@/lib/util";
import { IoMdArrowBack } from "react-icons/io";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [promotionPrice, setPromotionPrice] = useState(""); // New state for promotion price
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
      const res = await fetch(PRODUCT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          promotionPrice, // Add promotionPrice to the body
          description,
          image,
        }),
      });
      if (res.ok) {
        router.push("/dashboard/product"); // Redirect back to dashboard after adding
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
    <div style={{ marginLeft: "30px",marginTop:'30px' }}>
      <button
        onClick={() => router.back()}
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
      <h2 style={{ color: "orange", marginLeft: "480px" }}>Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid orange",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "550px",
          margin: "0 auto",
          marginTop: "30px",
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
              padding: "8px",
              marginTop: "5px",
              height: "40px",
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
              padding: "8px",
              marginTop: "5px",
              height: "40px",
              border: "1px solid orange",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>
        <br />
        <label style={{ display: "block" }}>
          Promotion Price:
          <input
            type="text"
            value={promotionPrice}
            onChange={(e) => setPromotionPrice(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              height: "40px",
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
              padding: "8px",
              marginTop: "5px",
              height: "80px",
              border: "1px solid orange",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>
        <br />
        <label style={{ display: "block" }}>
          Image:
          <input
            type="file"
            onChange={handleImage}
            required
            disabled={isUploading} // Disable input while uploading
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              height: "40px",
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
        )}{" "}
        {/* Image preview */}
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
            marginLeft: "430px",
          }}
        >
          {isUploading ? "Uploading..." : "Save"}
        </button>
      </form>
      <style jsx>{`
        .navLink:hover {
          color: red !important;
          color: #ff6633;
        }
        .back:hover {
          color: red;
        }
      `}</style>
    </div>
  );
}
