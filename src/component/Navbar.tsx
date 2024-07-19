"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { CartPage } from "./cartShopping";
import { ModeToggle } from "./ModeToggle";
import logo from "../../public/ninedev.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const userCookie = Cookies.get('user');
      setIsLoggedIn(!!userCookie);
    };

    checkLoginStatus();

    const intervalId = setInterval(checkLoginStatus, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove('user');
    setIsLoggedIn(false);
    router.push('/login');
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/product?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav style={{ display: 'flex', backgroundColor: "orange", color: 'white', width:'100%', height: 'auto', justifyContent: 'space-between', padding: '0 20px' }}>
      <div >
        <Image src={logo} 
        alt="Home"
        style={{ width:'100%', height:'80px', padding:'10px', borderRadius:'20px' }}
        />
      </div>
      <div className="navLinks" style={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}>
        <Link href="/" passHref>
          <p className="navLink" style={{ color: 'white', fontWeight: "bold", marginLeft: "80px" }}>Home</p>
        </Link>
        <Link href="/product" passHref>
          <p className="navLink" style={{ color: 'white', fontWeight: "bold", marginLeft: "80px" }}>Product</p>
        </Link>
        <Link href="/dashboard" passHref>
          <p className="navLink" style={{ color: 'white', fontWeight: "bold", marginLeft: "80px" }}>Management</p>
        </Link>
        <form className="searchForm" style={{ display: 'flex', alignItems: 'center', marginLeft: "80px" }} onSubmit={handleSearch}>
          <input 
            type="text" 
            name="search" 
            placeholder="Search products" 
            style={{ width: '250px', height: '33px', border: 'none', borderRadius:'15px' }} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="searchButton" style={{ width: '35px', height: '35px', marginLeft: '5px', border: 'none', borderRadius:'15px' }}><FaSearch /></button>
        </form>
        
        {isLoggedIn ? (
          <>
            <CartPage />
            <Link href="/product/favorite" passHref>
              <p className="navLink" style={{ color: 'white', fontWeight: "bold", marginLeft: "30px" }}><FcLike style={{ width: '30px', height: '30px' }} /></p>
            </Link>
            <Link href="/profile" passHref>
              <p className="navLink" style={{ color: 'white', fontWeight: "bold", marginLeft: "30px" }}>Profile</p>
            </Link>
            <span onClick={handleLogout} className="navLink" style={{ cursor: 'pointer', color: 'white', fontWeight: "bold", marginLeft: "30px" }}>Logout</span>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <p className="navLink" style={{ color: 'white', fontWeight: 'bold', marginLeft: '50px', textDecoration: 'none', padding: '5px 10px', borderRadius: '15px', backgroundColor: '#FF6633', border:'1px solid' }}>Login</p>
            </Link>
            <Link href="/register" passHref>
              <p className="navLink" style={{ color: 'white', fontWeight: 'bold', marginLeft: '20px', textDecoration: 'none', padding: '5px 10px', borderRadius: '15px', backgroundColor: '#FF6633', border:'1px solid' }}>Register</p>
            </Link>
          </>
        )}
        <ModeToggle/>
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
          color: #FF6633;
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
          .navLinks > * {
            margin-left: 10px;
          }
          .searchForm {
            margin-left: 10px;
          }
        }
        @media only screen and (min-width: 321px) and (max-width: 375px) {
          .navLinks > * {
            margin-left: 15px;
          }
          .searchForm {
            margin-left: 15px;
          }
        }
        @media only screen and (min-width: 376px) and (max-width: 414px) {
          .navLinks > * {
            margin-left: 18px;
          }
          .searchForm {
            margin-left: 18px;
          }
        }
        @media only screen and (min-width: 415px) and (max-width: 1080px) {
          .navLinks > * {
            margin-left: 20px;
          }
          .searchForm {
            margin-left: 20px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
