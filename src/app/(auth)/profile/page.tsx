"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      let userData = localStorage.getItem("user") || Cookies.get("user");
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        try {
          const response = await axios.get("/api/user"); // Adjust the endpoint as necessary
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          Cookies.set("user", JSON.stringify(response.data));
        } catch (error) {
          console.error("Failed to fetch user data", error);
          router.push("/login");
        }
      }
    };

    fetchUserData();
  }, [router]);

  if (!user) {
    return <div></div>;
  }

  return (
    <main
      style={{
        marginTop: "50px",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80%", // Thu nhỏ chiều rộng tổng thể
          maxWidth: "1000px", // Thu nhỏ kích thước tối đa
          height: "70vh", // Thu nhỏ chiều cao
          backgroundColor: "orange",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px", // Giảm khoảng padding
          }}
        >
          {user.avatar && (
            <img
              src={user.avatar}
              alt="Avatar"
              style={{
                width: "80%", // Thu nhỏ kích thước ảnh
                height: "70%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <form
          style={{
            flex: 2,
            padding: "30px", // Giảm khoảng padding
            border: "1px solid #ddd",
            borderRadius: "8px",
            maxWidth: "500px",
            height: "300px",
            marginTop: "70px",
            marginRight: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px", // Khoảng cách giữa tiêu đề và biểu tượng
            }}
          >
            <h1
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
              }}
            >
              Hi! {user.name}
            </h1>
            <Link href="/profile/edit">
              <CiEdit
                style={{ width: "35px", height: "35px", color: "blue",marginTop:'10px' }}
              />
            </Link>
          </div>

          <div style={{ marginBottom: "10px" }}>
            {" "}
            {/* Giảm khoảng cách dưới mỗi ô nhập */}
            <label
              style={{
                display: "block",
                fontSize: "18px", // Thu nhỏ kích thước chữ nhãn
                color: "white",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              Name:
            </label>
            <input
              type="text"
              value={user.name}
              readOnly
              style={{
                width: "95%",
                height:'25px',
                padding: "8px", // Giảm padding
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px", // Thu nhỏ kích thước chữ
                color: "#555",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                fontSize: "18px", // Thu nhỏ kích thước chữ nhãn
                color: "white",
                marginBottom: "10px",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              style={{
                width: "95%",
                height:'25px',
                padding: "8px", // Giảm padding
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px", // Thu nhỏ kích thước chữ
                color: "#555",
              }}
            />
            <p
              style={{
                marginBottom: "15px", // Giảm khoảng cách dưới tiêu đề// Thu nhỏ kích thước chữ tiêu đề
                color: "#333",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              {" "}
              All required user information can be save here.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Profile;
