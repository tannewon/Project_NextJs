"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import {
  FcBusinessman,
  FcHome,
  FcSoundRecordingCopyright,
} from "react-icons/fc";
import Cookies from "js-cookie";
import axios from "axios";
import { USER_API_URL } from "@/lib/util";
import { IoLogOut } from "react-icons/io5";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      let userData = localStorage.getItem("user") || Cookies.get(USER_API_URL);
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        try {
          const response = await axios.get("/api/user"); // Adjust the endpoint as necessary
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

  const handleLogout = () => {
    Cookies.remove("user");
    router.push("/login");
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        flexDirection: "column",
        marginTop: "95px",
      }}
    >
      <div
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "20px",
          height: "45px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginLeft: "270px",
        }}
      >
        <form
          className="searchForm"
          style={{
            alignItems: "center",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginRight: "20px",
          }}
          onSubmit={handleSearch}
        >
          <div style={{ position: "relative", width: "250px" }}>
            <button
              type="submit"
              style={{
                position: "absolute",
                right: "210px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "35px",
                height: "35px",
                border: "none",
                borderRadius: "15px",
                background: "transparent",
              }}
            >
              <FaSearch
                style={{ color: "gray", width: "20px", height: "20px" }}
              />
            </button>
            <input
              type="text"
              name="search"
              placeholder="Search products"
              style={{
                fontSize: "15px",
                width: "170px",
                height: "30px",
                border: "none",
                borderRadius: "15px",
                paddingRight: "45px", // Space for the button
                paddingLeft: "45px", // Space for the text from the left border
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <h1
            style={{
              color: "orange",
              flex: "1",
              textAlign: "center",
              margin: "0",
              marginRight: "500px",
            }}
          >
            Dashboard
          </h1>
        </form>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "auto" }}>
        <aside
          style={{
            width: "230px",
            backgroundColor: "#333",
            color: "#fff",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "80%",
            position: "fixed",
            top: 95,
            bottom: 100,
          }}
        >
          <div>
            {user && (
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt="Admin Avatar"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <div style={{ color: "#fff", fontSize: "16px" }}>
                  {user.name}
                </div>
              </div>
            )}
            <hr />
            <nav style={{ display: "block" }}>
              <p
                className="nav-item"
                style={{ marginTop: "20px", marginLeft: "50px" }}
              >
                <Link href="/dashboard">
                  <FcHome />
                  <span
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      marginLeft: "10px",
                    }}
                  >
                    Dashboard
                  </span>
                </Link>
              </p>
              <p
                className="nav-item"
                style={{ marginTop: "20px", marginLeft: "50px" }}
              >
                <Link href="/dashboard/product">
                  <FcSoundRecordingCopyright />
                  <span
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      marginLeft: "10px",
                    }}
                  >
                    Product
                  </span>
                </Link>
              </p>
              <p
                className="nav-item"
                style={{ marginTop: "20px", marginLeft: "50px" }}
              >
                <Link href="/dashboard/user">
                  <FcBusinessman />
                  <span
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      marginLeft: "10px",
                    }}
                  >
                    User
                  </span>
                </Link>
              </p>
            </nav>
            <button
              onClick={handleLogout}
              className="nav-item"
              style={{
                color: "#fff",
                textDecoration: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "17px",
                marginLeft: "70px",
                display: "flex",
                alignItems: "center",
                marginTop: "230px",
              }}
            >
              <IoLogOut
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
              <span>Logout</span>
            </button>
          </div>
        </aside>
        <main
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            marginLeft: "270px",
          }}
        >
          {children}
        </main>
      </div>
      <style jsx>{`
        @media (max-width: 320px) and (orientation: portrait) {
          .searchForm {
            flex-direction: column;
          }

          .searchForm input {
            width: 100%;
            margin-bottom: 10px;
          }

          .searchForm h1 {
            margin-left: 0;
            margin-top: 10px;
          }

          aside {
            width: 100%;
            height: auto;
            padding: 10px;
            flex-direction: column;
            align-items: center;
          }

          aside nav p {
            margin-top: 10px;
          }

          main {
            padding: 5px;
            margin-left: 0;
          }
        }

        @media (max-width: 480px) {
          .searchForm {
            flex-direction: column;
          }

          .searchForm input {
            width: 100%;
            margin-bottom: 10px;
          }

          .searchForm h1 {
            margin-left: 0;
            margin-top: 10px;
          }

          aside {
            width: 100%;
            height: auto;
            padding: 10px;
            flex-direction: column;
            align-items: center;
          }

          aside nav p {
            margin-top: 10px;
          }

          main {
            padding: 10px;
            margin-left: 0;
          }
        }

      `}</style>
    </div>
  );
};

export default DashboardLayout;
