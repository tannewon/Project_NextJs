"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { USER_API_URL } from "@/lib/util";
import { IoMdArrowBack } from "react-icons/io";
import Image from "next/image";

const fetchUser = async (id: string) => {
  const res = await fetch(`${USER_API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

const updateUser = async (id: string, data: any) => {
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
  if (!res.ok) throw new Error("Failed to upload image");
  const data = await res.json();
  return data.secure_url;
};

const EditUserPage = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      fetchUser(id)
        .then((data) => {
          setUser(data);
          setName(data.name || "");
          setEmail(data.email || "");
          setAvatar(data.avatar || "");
          setAvatarPreview(data.avatar || "");
          setPassword(data.password || "");
          setConfirmPassword(data.confirmPassword || "");
          setRole(data.role || "");
        })
        .catch((error) => setError("Failed to fetch user data"));
    }
  }, [id]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setIsUploading(true);
      try {
        const url = await uploadImage(file);
        setAvatar(url);
      } catch (error) {
        setError("Failed to upload avatar");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await updateUser(id!, { id, name, email, avatar, password, role });
      router.push("/dashboard/user");
    } catch (error) {
      setError("Failed to update user data");
    }
  };

  if (!user) return <div></div>;

  return (
    <div style={{ marginLeft: "30px",marginTop:'30px' }}>
      <button
        onClick={() => router.push("/dashboard/user")}
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
      <h2 style={{ color: "orange", textAlign: "center" }}>Edit User</h2>
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid orange",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "500px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
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
        <label style={{ display: "block" }}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <label style={{ display: "block" }}>
          Password:
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginLeft: "-35px",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </label>
        <label style={{ display: "block" }}>
          Confirm Password:
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginLeft: "-35px",
              }}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </label>
        <label style={{ display: "block" }}>
          Role:
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
        <label style={{ display: "block", marginTop: "10px" }}>
          Avatar:
          <div style={{ marginTop: "5px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "block" }}
            />
            {avatarPreview && (
              <Image
                src={avatarPreview}
                alt="Avatar Preview"
                width={100}
                height={100}
                style={{ marginTop: "10px", borderRadius: "50%" }}
              />
            )}
          </div>
        </label>

        <button
          type="submit"
          disabled={isUploading}
          style={{
            backgroundColor: "orange",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px",
            width: "100px",
            marginLeft: "400px",
          }}
        >
          {isUploading ? "Updating..." : "Update"}
        </button>
      </form>
      <style jsx>{`

        .back:hover {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default EditUserPage;
