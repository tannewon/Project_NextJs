// Profile.tsx

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { USER_API_URL } from "@/lib/util";

const Profile = () => {
  const [user, setUser] = useState<any>(null); // State để lưu thông tin user
  const router = useRouter();

  useEffect(() => {
    // Hàm này sẽ chạy khi component được mount
    const userData = localStorage.getItem("user") || Cookies.get(USER_API_URL); // Lấy thông tin user từ local storage hoặc cookie
    if (userData) {
      setUser(JSON.parse(userData)); // Parse dữ liệu user từ string JSON và lưu vào state
    } else {
      // Nếu không có thông tin user, redirect về trang login
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main>
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
            Profile
          </h2>
          <div
            style={{
              marginBottom: "15px",
              fontSize: "18px",
              color: "#555",
            }}
          >
            <strong style={{ fontWeight: "bold", color: "#333" }}>Name:</strong>{" "}
            {user.name}
          </div>
          <div
            style={{
              marginBottom: "15px",
              fontSize: "18px",
              color: "#555",
            }}
          >
            <strong style={{ fontWeight: "bold", color: "#333" }}>
              Email:
            </strong>{" "}
            {user.email}
          </div>
          {/* Additional user information can be added here */}
        </div>
      </div>
    </main>
  );
};

export default Profile;
