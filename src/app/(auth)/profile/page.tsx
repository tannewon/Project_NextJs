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
        padding: "0 10px", // Add padding to avoid content touching edges on small screens
        position: "relative", // Set relative position to create a positioning context
      }}
    >
      <h1
        style={{
          width: "200px",
          margin: "0 0 10px",
          color: "#333",
          fontSize: "35px",
          background: "linear-gradient(to right, red, orange)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "30px",
          position: "absolute", // Position absolutely within the relative main container
          top: "100px",
          left: "10",
          zIndex: "1", // Ensure the h1 is above other elements
        }}
      >
        My Profile
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxWidth: "1000px",
          height: "auto", // Make height auto to accommodate content height
          background: "linear-gradient(to left, orange, red, orange )", // Gradient from left to right
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          flexWrap: "wrap", // Allow wrapping on smaller screens
          position: "relative", // Ensure that div also respects relative positioning
          marginTop: "60px", // Adjust this margin to avoid overlapping with h1
        }}
      >
        <div
          style={{
            flex: "1 1 300px", // Flex-grow, flex-shrink, flex-basis for responsiveness
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          {user.avatar && (
            <img
              src={user.avatar}
              alt="Avatar"
              style={{
                height: "70%",
                maxWidth: "300px", // Add max-width to prevent it from getting too large
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <form
          style={{
            flex: "2 1 300px",
            padding: "30px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            maxWidth: "500px",
            height: "300px",
            margin: "10px",
            marginTop: "30px",
            marginBottom: "30px  ",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <h1
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                fontSize: "24px", // Adjust font size for responsiveness
              }}
            >
              Hi! {user.name}
            </h1>
            <Link href="/profile/edit">
              <CiEdit
                style={{
                  width: "30px",
                  height: "30px",
                  color: "blue",
                  marginTop: "10px",
                }}
              />
            </Link>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                fontSize: "18px",
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
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                color: "#555",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                fontSize: "18px",
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
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                color: "#555",
              }}
            />
            <p
              style={{
                marginBottom: "15px",
                color: "#333",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              All required user information can be saved here.
            </p>
          </div>
        </form>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          main {
            padding: 0 5px;
          }
          div[style*="flex-direction: row"] {
            flex-direction: column;
          }
          div[style*="flex: 1 1 300px"] {
            flex: 1 1 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </main>
  );
};

export default Profile;
