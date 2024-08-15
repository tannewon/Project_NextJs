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
import logoadmin from "../../../public/logoadmin.png";
import Image from "next/image";

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
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <header
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "20px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%", // Adjust to account for the sidebar width
          zIndex: "1000",
        }}
      >
        <Image
          src={logoadmin}
          alt="Home"
          width={100}
          height={70}
          style={{ marginLeft: "70px" }}
        />
        <form
          className="searchForm"
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            marginLeft: "100px",
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
                fontSize: "17px",
                width: "70%",
                height: "30px",
                border: "none",
                borderRadius: "15px",
                paddingRight: "45px",
                paddingLeft: "50px",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <h1
            style={{
              color: "orange",
              marginLeft: "300px",
              fontSize: "30px",
              background: "linear-gradient(to right, red, orange)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dashboard
          </h1>
        </form>
      </header>

      <div style={{ display: "flex", flex: 1, marginTop: "45px" }}>
        <aside
          style={{
            width: "230px",
            backgroundColor: "#333",
            color: "#fff",
            padding: "20px",
            overflowY: "auto",
            position: "fixed",
            top: "85px", // Starts right below the header
            left: "0",
            bottom: "0",
            height: "calc(100vh - 45px)", // Adjust height based on the header
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
                style={{ marginTop: "20px", marginLeft: "30px" }}
              >
                <Link href="/dashboard">
                  <FcHome />
                  <span
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      marginLeft: "10px",
                      fontSize: "18px",
                    }}
                    className="text"
                  >
                    Dashboard
                  </span>
                </Link>
              </p>
              <p
                className="nav-item"
                style={{ marginTop: "20px", marginLeft: "30px" }}
              >
                <Link href="/dashboard/product">
                  <FcSoundRecordingCopyright />
                  <span
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      marginLeft: "10px",
                      fontSize: "18px",
                    }}
                    className="text"
                  >
                    Product
                  </span>
                </Link>
              </p>
              <p
                className="nav-item"
                style={{ marginTop: "20px", marginLeft: "30px" }}
              >
                <Link href="/dashboard/user">
                  <FcBusinessman />
                  <span
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      marginLeft: "10px",
                      fontSize: "18px",
                    }}
                    className="text"
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
                marginLeft: "50px",
                display: "flex",
                alignItems: "center",
                marginTop: "230px",
              }}
            >
              <IoLogOut
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
              <span style={{ fontSize: "18px" }} className="textlogout">
                Logout
              </span>
            </button>
          </div>
        </aside>
        <main style={{ flex: 1, marginLeft: "230px", padding: "20px", overflowY: "auto" }}>
          {children}
        </main>
      </div>

      <style jsx>{`
        .text:hover {
          color: orange !important;
        }
        .textlogout:hover {
          color: red !important;
        }
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
            padding: 5px;
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
