"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa"; // Gộp chung các icon
import { ModeToggle } from "./ModeToggle";
import { CartPage } from "../component/cartShopping";
import logoa from "../../public/logoadmin.png";
import { MdGTranslate } from "react-icons/md";
import "@/i18n/i18n";
import { useTranslation } from "react-i18next";
import { locales } from "@/i18n/i18n";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { i18n } = useTranslation();
  const currentLanguage = locales[i18n.language as keyof typeof locales];
  const { t } = useTranslation("navbar");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
              ? "https://example.com/admin-avatar.jpg" // Đổi lại thành URL thực tế
              : user.avatar ||
                  "https://res.cloudinary.com/dyfs9b4uj/image/upload/v1721632594/bo791ggfbtugthfb48pn.jpg"
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
    // Xóa thông tin người dùng
    ["user", "productIds", "products", "currentUser", "cartItems"].forEach(
      (item) => localStorage.removeItem(item)
    );
    Cookies.remove("user");
    setIsLoggedIn(false);
    setUserAvatar(null);
    setIsAdmin(false);
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/product?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleTranslation = () => setShowTranslation(!showTranslation);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const changeLanguage = (lng: "en" | "vi") => {
    i18n.changeLanguage(lng);
  };

  if (isDashboard) return null;

  return (
    <header>
      <div className="logo">
        <Image src={logoa} alt="Home" width={100} height={70} />
      </div>

      <div className="navLinks">
        <nav style={{ marginRight: "50px" }}>
          <div className="menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={30} />}
          </div>
          <ul className={`navLinks ${isMenuOpen ? "open" : ""}`}>
            <li
              onMouseEnter={() => setHoveredItem("home")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href="/"
                onClick={toggleMenu}
                style={{
                  color: hoveredItem === "home" ? "yellow" : "white", // Thay đổi màu khi hover
                  fontWeight: "bold",
                  fontSize: "17px",
                  textDecoration: "none",
                }}
              >
                {t("home")}
              </Link>
            </li>
            <li
              onMouseEnter={() => setHoveredItem("product")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href="/product"
                onClick={toggleMenu}
                style={{
                  color: hoveredItem === "product" ? "yellow" : "white",
                  fontWeight: "bold",
                  fontSize: "17px",
                  margin: "0 15px",
                  textDecoration: "none", // Thêm dòng này
                }}
              >
                {t("product")}
              </Link>
            </li>

            <li
              onMouseEnter={() => setHoveredItem("management")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href="/dashboard"
                onClick={toggleMenu}
                style={{
                  color: hoveredItem === "management" ? "yellow" : "white",
                  fontWeight: "bold",
                  fontSize: "17px",
                  margin: "0 15px",
                  textDecoration: "none", // Thêm dòng này
                }}
              >
                {t("management")}
              </Link>
            </li>
          </ul>
        </nav>

        <form
          className="searchForm"
          onSubmit={handleSearch}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "17px",
            margin: "10px 20px",
            flex: 1,
            marginRight: "50px",
          }}
        >
          <div
            className="searchContainer"
            style={{ position: "relative", width: "100%" }}
          >
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="searchButton"
              style={{
                position: "absolute",
                right: "165px",
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
          </div>
        </form>

        {isLoggedIn ? (
          <>
            <div style={{ marginRight: "50px" }}>
              <CartPage />
            </div>
            <div
              style={{ position: "relative", marginRight: "20px" }}
              className="avatarDropdown"
            >
              <Link href="" onClick={toggleDropdown}>
                <Image
                  style={{ border: "2px solid white", borderRadius: "100%" }}
                  src={userAvatar || "/default-avatar.png"}
                  alt="Avatar"
                  width={60}
                  height={60}
                  className="avatar"
                />
              </Link>

              {showDropdown && (
                <div
                  className="dropdownMenu"
                  style={{
                    position: "absolute",
                    left: 10, // Căn sang phải
                    top: "70px", // Vị trí dưới avatar
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#333",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000,
                    width: "80px",
                  }}
                >
                  <Link
                    onMouseEnter={() => setHoveredItem("profile")}
                    onMouseLeave={() => setHoveredItem(null)}
                    href="/profile"
                    onClick={toggleDropdown}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      margin: 0,
                      color: hoveredItem === "profile" ? "yellow" : "white",
                      textDecoration: "none",
                    }}
                  >
                    {t("profile")}
                  </Link>
                  <Link
                    onMouseEnter={() => setHoveredItem("favorite")}
                    onMouseLeave={() => setHoveredItem(null)}
                    href="/product/favorite"
                    onClick={toggleDropdown}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      margin: 0,
                      color: hoveredItem === "favorite" ? "yellow" : "white",
                      textDecoration: "none",
                    }}
                  >
                    {t("favorite")}
                  </Link>
                  <p
                    onMouseEnter={() => setHoveredItem("logout")}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      margin: 0,
                      color: hoveredItem === "logout" ? "black" : "white",
                      textDecoration: "none",
                    }}
                    onClick={handleLogout}
                  >
                    {t("logout")}
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              onMouseEnter={() => setHoveredItem("login")}
              onMouseLeave={() => setHoveredItem(null)}
              href="/login"
              className="authLink"
              style={{
                color: "white",
                fontWeight: "bold",
                marginLeft: "40px",
                fontSize: "17px",
                textDecoration: "none",
                padding: "5px 10px",
                borderRadius: "15px",
                backgroundColor:
                  hoveredItem === "login" ? "#FF9900" : "#FF6633",
                border: "2px solid white",
              }}
            >
              {t("login")}
            </Link>
            <Link
              onMouseEnter={() => setHoveredItem("register")}
              onMouseLeave={() => setHoveredItem(null)}
              href="/register"
              className="authLink"
              style={{
                color: "white",
                fontWeight: "bold",
                marginLeft: "10px",

                fontSize: "17px",
                textDecoration: "none",
                padding: "5px 10px",
                borderRadius: "15px",
                backgroundColor:
                  hoveredItem === "register" ? "#FF9900" : "#FF6633",
                border: "2px solid white",
              }}
            >
              {t("register")}
            </Link>
          </>
        )}
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            color: "white",
            fontWeight: "bold",
            marginLeft: "15px",
            fontSize: "17px",
            textDecoration: "none",
            padding: "5px 10px",
            borderRadius: "15px",
            backgroundColor: isHovered ? "#FF9900" : "#FF6633",
            border: "2px solid white",
          }}
          className="avatarDropdown"
          onClick={toggleTranslation}
        >
          <MdGTranslate style={{ fontWeight: "bold" }} />{" "}
          <span style={{ fontWeight: "bold" }}> {t("language")}</span>
          {showTranslation && (
            <div
              className="dropdownMenu"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                textAlign: "center",
                marginLeft:'30px'
              }}
            >
              <p
                className="lang"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",

                }}
                onClick={() => changeLanguage("vi")}
              >
                Vietnamese
              </p>
              <p
                className="lang"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",

                }}
                onClick={() => changeLanguage("en")}
              >
                English
              </p>
            </div>
          )}
        </button>
        <ModeToggle />
      </div>

      <style jsx>{`
        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(to right, orange, #ff4040, orange);
          padding: 0 20px;
          height: 90px;
          color: white;
        }
        .lang:hover {
          color: yellow;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .navLinks {
          display: flex;
          align-items: center;
          margin-right: 100px;
        }

        .menu-icon {
          display: none;
          cursor: pointer;
        }

        .navLinks ul {
          display: flex;
          gap: 30px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .searchForm {
          flex: 1;
          display: flex;
          align-items: center;
          margin: 10px 20px;
        }

        .searchContainer {
          position: relative;
          width: 100%;
        }

        .searchButton {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
        }

        input {
          width: 150px;
          padding: 8px 12px;
          border-radius: 15px;
          padding-left: 40px;
          border: none;
        }

        .authLink {
          background-color: #ff6633;
          padding: 5px 10px;
          border-radius: 15px;
          font-weight: bold;
          color: white;
          text-decoration: none;
        }

        .avatar {
          border-radius: 50%;
          cursor: pointer;
        }

        .avatarDropdown {
          position: relative;
        }

        .dropdownMenu {
          position: absolute;
          top: 60px;
          left: 5px;
          background: linear-gradient(to right, orange, #ff4040, orange);
          color: white;
          border-radius: 5px;
          padding: 10px;
        }

        .dropdownMenu p,
        .dropdownMenu a {
          cursor: pointer;
          margin: 0;
          padding: 10px;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .menu-icon {
            display: block;
          }

          .navLinks ul {
            flex-direction: column;
            display: ${isMenuOpen ? "block" : "none"};
            width: 100%;
            position: absolute;
            top: 90px;
            left: 0;
            background: linear-gradient(to right, orange, #ff4040, orange);
            padding: 10px 0;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
