"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { USER_API_URL } from "@/lib/util";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      let userData = localStorage.getItem("user") || Cookies.get(USER_API_URL);
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        // If no user data in localStorage or cookies, fetch from API
        try {
          const response = await axios.get('/api/user'); // Adjust the endpoint as necessary
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          Cookies.set(USER_API_URL, JSON.stringify(response.data));
        } catch (error) {
          console.error("Failed to fetch user data", error);
          router.push("/login");
        }
      }
    };

    fetchUserData();
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
          {user.avatar && (
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <img
                src={user.avatar}
                alt="Avatar"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
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
        </div>
      </div>
    </main>
  );
};

export default Profile;
