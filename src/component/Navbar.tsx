"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { ModeToggle } from "./ModeToggle";
import logoa from "../../public/logoadmin.png";
import { usePathname } from "next/navigation";
import { CartPage } from "../component/cartShopping";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");

  useEffect(() => {
    const checkLoginStatus = () => {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        try {
          const user = JSON.parse(userCookie);
          setIsLoggedIn(true);
          setIsAdmin(user.role === "admin");
          setUserAvatar(
            user.role === "admin"
              ? "https://example.com/admin-avatar.jpg" // Replace with actual admin avatar URL
              : user.avatar ||
                  "https://res.cloudinary.com/dyfs9b4uj/image/upload/v1721632594/bo791ggfbtugthfb48pn.jpg" // Use user.avatar if available
          );
        } catch (error) {
          console.error("Error parsing user cookie:", error);
          setIsLoggedIn(false);
          setIsAdmin(false);
          setUserAvatar(null);
        }
      } else {
        setIsLoggedIn(false);
        setUserAvatar(null);
        setIsAdmin(false);
      }
    };

    checkLoginStatus();
    const intervalId = setInterval(checkLoginStatus, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("user");
    localStorage.removeItem("productIds");
    localStorage.removeItem("products");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cartItems");

    Cookies.remove("user");
    setIsLoggedIn(false);
    setUserAvatar(null);
    setIsAdmin(false);
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/product?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLinkClick = () => {
    setShowDropdown(false);
  };

  if (isDashboard) {
    return null;
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        flexDirection: "row",
        background: "linear-gradient(to right, orange, #FF4040, orange)",
        color: "white",
        width: "100%",
        height: "90px",
        justifyContent: "space-between",
        padding: "0 20px",
        boxSizing: "border-box",
      }}
    >
      <div>
        <Image src={logoa} alt="Home" width={100} height={70} />
      </div>
      <div
        className="navLinks"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          marginRight: "100px",
          gap: "30px",
        }}
      >
        <Link href="/" passHref>
          <p
            className="navLink"
            style={{
              color: "white",
              fontWeight: "bold",

              fontSize: "17px",
              margin: "0 15px",
            }}
          >
            Home
          </p>
        </Link>
        <Link href="/product" passHref>
          <p
            className="navLink"
            style={{
              color: "white",
              fontWeight: "bold",

              fontSize: "17px",
              margin: "0 15px",
            }}
          >
            Product
          </p>
        </Link>
        <Link href="/dashboard" passHref>
          <p
            className="navLink"
            style={{
              color: "white",
              fontWeight: "bold",
 
              fontSize: "17px",
              margin: "0 15px",
            }}
          >
            Management
          </p>
        </Link>
        <form
          className="searchForm"
          style={{
            display: "flex",
            alignItems: "center",

            fontSize: "17px",
            margin: "10px 20px",
            flex: 1,
          }}
          onSubmit={handleSearch}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <button
              type="submit"
              style={{
                position: "absolute",
                right: "245px",
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
                width: "200px",
                height: "33px",
                border: "none",

                borderRadius: "15px",
                paddingRight: "45px", // Space for the button
                paddingLeft: "35px",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        {isLoggedIn ? (
          <>
            <CartPage />
            <div style={{ position: "relative" }}>
              <Image
                src={userAvatar || "/default-avatar.png"}
                alt="Avatar"
                width={70}
                height={60}
                style={{
                  borderRadius: "50%",
                  cursor: "pointer",
                  marginLeft: "20px",
                }}
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "60px",
                    left: 5,
                    background: "linear-gradient(to right, orange, #FF4040, orange)",

                    color: "black",
                    borderRadius: "5px",
                    padding: "10px",
                    zIndex: 1000,
                  }}
                >
                  <Link href="/profile">
                    <p
                      onClick={handleLinkClick}
                      className="navLink"
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        margin: 0,
                        fontWeight: "bold",
                        fontFamily: "roboto",
                        color:'white'
                      }}
                    >
                      Profile
                    </p>
                  </Link>
                  <Link href="/product/favorite">
                    <p
                      onClick={handleLinkClick}
                      className="navLink"
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        margin: 0,
                        fontWeight: "bold",
                        fontFamily: "roboto",
                        color:'white'

                      }}
                    >
                      Favorite
                    </p>
                  </Link>
                  <p
                    onClick={handleLogout}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      margin: 0,
                      fontWeight: "bold",
                      fontFamily: "roboto",
                    }}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
            {/* <ModeToggle /> */}
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <p
                className="navLink"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginLeft: "40px",
                  fontSize: "17px",
                  textDecoration: "none",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  backgroundColor: "#FF6633", // Example background color
                  border: "1px solid transparent", // Border to show focus
                }}
              >
                Login
              </p>
            </Link>
            <Link href="/register" passHref>
              <p
                className="navLink"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginLeft: "10px",

                  fontSize: "17px",
                  textDecoration: "none",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  backgroundColor: "#FF6633", // Example background color
                  border: "1px solid transparent", // Border to show focus
                }}
              >
                Register
              </p>
            </Link>
          </>
        )}
      </div>
      <style jsx>{`
        nav {
          padding: 0 20px;
        }
        .navLink {
          transition: color 0.3s, background-color 0.3s;
        }
        .navLink:hover {
          color: #BBBBBB !important;
          color: #ff6633;
        }
        .searchButton {
          transition: background-color 0.3s;
        }
        .searchButton:hover {
          background-color: rgba(255, 0, 0, 0.2);
        }
        @media only screen and (max-width: 320px) {
          nav {
            padding: 0 10px;
          }
          .searchForm {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
