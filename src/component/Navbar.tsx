"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { CartPage } from "./cartShopping";
import { ModeToggle } from "./ModeToggle";
import logo from "../../public/ninedev.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        try {
          const user = JSON.parse(userCookie);
          setIsLoggedIn(true);
          setIsAdmin(user.role === 'admin');
          setUserAvatar(user.role === 'admin' 
            ? 'https://example.com/admin-avatar.jpg' // Replace with actual admin avatar URL
            : user.avatar || 'https://res.cloudinary.com/dyfs9b4uj/image/upload/v1721632594/bo791ggfbtugthfb48pn.jpg' // Use user.avatar if available
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

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        margin: "0 auto",
        display: "flex",
        backgroundColor: "orange",
        color: "white",
        width: "100%",
        height: "90px",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <div>
        <Image
          src={logo}
          alt="Home"
          width={100}
          height={70}
          style={{
            width: "100%",
            height: "70px",
            padding: "10px",
            borderRadius: "20px",
          }}
        />
      </div>
      <div
        className="navLinks"
        style={{ display: "flex", alignItems: "center", marginRight: "100px" }}
      >
        <Link href="/" passHref>
          <p
            className="navLink"
            style={{
              color: "white",
              fontWeight: "bold",
              fontFamily: "Roboto",
              fontSize: "18px",
              marginLeft: "80px",
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
              fontFamily: "Roboto",
              fontSize: "18px",
              marginLeft: "80px",
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
                fontFamily: "Roboto",
                fontSize: "18px",
                marginLeft: "80px",
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
            fontFamily: "Roboto",
            fontSize: "18px",
            marginLeft: "100px",
            marginRight: '50px'
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
              <FaSearch style={{ color: "gray", width: '20px', height: '20px' }} />
            </button>
            <input
              type="text"
              name="search"
              placeholder="Search products"
              style={{
                fontSize: '15px',
                width: "150px",
                height: "33px",
                border: "none",
                fontFamily: "Roboto",
                borderRadius: "15px",
                paddingRight: "45px", // Space for the button
                paddingLeft: "45px", // Space for the text from the left border
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {isLoggedIn ? (
          <>
            <CartPage />
            <div style={{ position: 'relative' }}>
              <Image
                src={userAvatar || '/default-avatar.png'}
                alt="Avatar"
                width={50}
                height={50}
                style={{
                  borderRadius: "50%",
                  cursor: "pointer",
                  marginLeft: "50px",
                }}
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div style={{
                  position: "absolute",
                  top: "50px",
                  left: 20,
                  backgroundColor: "#ffff",
                  color: "black",
                  borderRadius: "5px",
                  padding: "10px",
                  zIndex: 1000,
                }}>
                  <Link href="/profile">
                    <p className="navLink" style={{ padding: "0px 16px", cursor: "pointer", margin: 0, fontWeight: 'bold' }}>Profile</p>
                  </Link>
                  <Link href="/product/favorite">
                    <p className="navLink" style={{ padding: "0px 16px", cursor: "pointer", margin: 0, fontWeight: 'bold' }}>Favorite</p>
                  </Link>
                  <p
                    onClick={handleLogout}
                    style={{ padding: "15px 16px", cursor: "pointer", margin: 0, fontWeight: 'bold' }}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
            <ModeToggle />
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <p
                className="navLink"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginLeft: "50px",
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  textDecoration: "none",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  backgroundColor: "#FF6633",
                  border: "1px solid",
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
                  marginLeft: "20px",
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  textDecoration: "none",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  backgroundColor: "#FF6633",
                  border: "1px solid",
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
          color: red !important;
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
    </nav>
  );
};

export default Navbar;
