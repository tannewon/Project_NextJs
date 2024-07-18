"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { USER_API_URL } from "@/lib/util";
import type { FormData } from "@/type/types"; // Use type-only import
import Link from "next/link";

const fetchUser = async (id: string) => {
  const res = await fetch(`${USER_API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

const updateUser = async (id: string, data: FormData) => {
  const res = await fetch(`${USER_API_URL}/${id}`, {
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

export default function EditUserPage() {
  const [user, setUser] = useState<FormData | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setIsUploading(true);
      try {
        const url = await uploadImage(file);
        setAvatar(url);
      } catch (error) {
        alert("Failed to upload avatar");
      } finally {
        setIsUploading(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser(id as string)
        .then((data) => {
          setUser(data);
          setName(data.name);
          setEmail(data.email);
          setAvatar(data.avatar);
          setAvatarPreview(data.avatar);
          setPassword(data.password || "");
          setConfirmPassword(data.confirmPassword || "");
          setRole(data.role || "");
        })
        .catch((error) => console.error("Failed to fetch user data:", error));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(id as string, { id: id as string, name, email, avatar, password, confirmPassword, role });
      router.push("/dashboard/user");
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2 style={{ color: "orange", marginLeft: "520px" }}>Edit User</h2>
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
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Avatar:
          <input
            type="file"
            onChange={handleAvatarChange}
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
        {avatarPreview && (
          <img
            src={avatarPreview}
            alt="Avatar preview"
            style={{ width: "200px", height: "200px" }}
          />
        )}
        <br />
        <label style={{ marginBottom: "10px", display: "block" }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          Role:
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
        <button
          type="submit"
          disabled={isUploading}
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
        <Link href={`/user`}>
          <button
            type="button"
            style={{
              backgroundColor: "grey",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
              marginLeft: "10px",
            }}
          >
            Back
          </button>
        </Link>
      </form>
    </div>
  );
}
