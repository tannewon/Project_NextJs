"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { USER_API_URL } from "@/lib/util";

const EditProfile = () => {
  const [user, setUser] = useState<any>(() => {
    const userData = localStorage.getItem("user") || Cookies.get(USER_API_URL);
    return userData ? JSON.parse(userData) : null;
  });
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(formData.avatar || "");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updateData = { ...formData };

    // Handle avatar upload if a file is selected
    if (avatarFile) {
      const fileData = new FormData();
      fileData.append("file", avatarFile);
      fileData.append("upload_preset", "rymvqqtd"); // Replace with your Cloudinary upload preset

      try {
        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dyfs9b4uj/image/upload",
          fileData
        );
        updateData.avatar = uploadResponse.data.secure_url;
      } catch (uploadError) {
        console.error("Failed to upload avatar", uploadError);
        return; // Exit if upload fails
      }
    }

    // Update user data
    try {
      const userId = user?.id; // Ensure you have the user's ID
      const response = await axios.put(`${USER_API_URL}/${userId}`, updateData); // Adjust the endpoint
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      Cookies.set(USER_API_URL, JSON.stringify(response.data));
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update user data", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  if (!user) {
    return <div></div>;
  }

  return (
    <main style={{ marginTop:'150px' }}>
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "orange",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
            }}
          >
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                marginBottom: "15px",
                fontSize: "18px",
                color: "#555",
              }}
            >
              <label
                style={{ fontWeight: "bold", color: "#333" }}
                htmlFor="name"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div
              style={{
                marginBottom: "15px",
                fontSize: "18px",
                color: "#555",
              }}
            >
              <label
                style={{ fontWeight: "bold", color: "#333" }}
                htmlFor="email"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div
              {...getRootProps()}
              style={{
                border: "1px dashed #ccc",
                width:"200px",
                marginLeft:'200px'

              }}
            >
              <input {...getInputProps()} />
              <p>Upload avatar here</p>
              {avatarFile && (
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <strong>Selected file:</strong> {avatarFile.name}
                </div>
              )}
              {avatarPreview && (
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              style={{
                marginTop:'20px',
                padding: "10px 20px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => router.push("/profile")}
              style={{
                padding: "10px 20px",
                marginLeft: "90px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
