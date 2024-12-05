"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { USER_API_URL } from "@/lib/util";
import { IoMdArrowBack } from "react-icons/io";

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
  const [avatarPreview, setAvatarPreview] = useState<string>(
    formData.avatar || ""
  );
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

    if (avatarFile) {
      const fileData = new FormData();
      fileData.append("file", avatarFile);
      fileData.append("upload_preset", "rymvqqtd");

      try {
        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dyfs9b4uj/image/upload",
          fileData
        );
        updateData.avatar = uploadResponse.data.secure_url;
      } catch (uploadError) {
        console.error("Failed to upload avatar", uploadError);
        return;
      }
    }

    try {
      const userId = user?.id;
      const response = await axios.put(`${USER_API_URL}/${userId}`, updateData);
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
    return <div>Loading...</div>;
  }

  return (
    <main
      style={{
        padding: "40px",
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            padding: "30px",
            background: "linear-gradient(to left, orange, red, orange)",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "700px",
            width: "100%",
            boxSizing: "border-box",
            position: "relative",
            display: "flex", // Căn giữa theo chiều ngang
            justifyContent: "center", // Căn giữa theo chiều ngang
            alignItems: "center", // Căn giữa theo chiều dọc
            flexDirection: "column", // Giúp các phần tử bên trong div xếp theo cột
          }}
        >
          <IoMdArrowBack
            onClick={() => router.push("/profile")}
            style={{
              backgroundColor: "#EEEEEE",
              color: "black",
              padding: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "20px",
              position: "absolute",
              top: "20px",
              left: "20px",
            }}
          />
          <h2
            style={{
              marginBottom: "20px",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
            }}
          >
            Edit Profile
          </h2>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              maxWidth: "500px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ marginBottom: "20px", width: "100%" }}>
              <label
                style={{ fontSize: "18px", color: "white", fontWeight: "bold" }}
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
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px", width: "100%" }}>
              <label
                style={{ fontSize: "18px", color: "white", fontWeight: "bold" }}
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
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              {...getRootProps()}
              style={{
                marginTop: "20px",
                border: "2px dashed #ddd",
                padding: "20px",
                borderRadius: "8px",
                cursor: "pointer",
                textAlign: "center",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <input {...getInputProps()} />
              <p style={{ margin: 0 }}>Upload avatar here</p>
              {avatarFile && (
                <div style={{ marginTop: "10px" }}>
                  <strong>Selected file:</strong> {avatarFile.name}
                </div>
              )}
              {avatarPreview && (
                <div style={{ marginTop: "10px" }}>
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    style={{
                      maxWidth: "200px",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginTop: "10px",
                    }}
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "30px",
                width: "50%",
                maxWidth: "200px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
