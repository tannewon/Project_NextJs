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

    // Listen for cookie changes
    const intervalId = setInterval(checkLoginStatus, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
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
    <nav style={{ display: 'flex', backgroundColor: "orange", color: 'white',width:'100%', height: 'auto', justifyContent: 'space-between', padding: '0 20px' }}>
      <div >
        <Image src={logo} 
        alt="Home"
        style={{ width:'100%',height:'80px',padding:'10px',borderRadius:'20px' }}
        />
      </div>
      <div className="navLinks" style={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}>
        <Link href="/" style={{ color: 'white', fontWeight: "bold", marginLeft: "80px" }}>Home</Link>
        <Link href="/product" style={{ color: 'white', fontWeight: "bold", marginLeft: "80px" }}>Product</Link>
        <Link href="/dashboard" style={{ color: 'white', fontWeight: "bold", marginLeft: "80px" }}>Management</Link>
        <form className="searchForm" style={{ display: 'flex', alignItems: 'center', marginLeft: "80px" }} onSubmit={handleSearch}>
          <input 
            type="text" 
            name="search" 
            placeholder="Search products" 
            style={{ width: '250px', height: '33px', border: 'none',borderRadius:'15px' }} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" style={{ width: '35px', height: '35px', marginLeft: '5px', border: 'none',borderRadius:'15px' }}><FaSearch /></button>
        </form>
        
        
        {isLoggedIn ? (
          <>
            <CartPage />
            <Link href="/product/favorite" style={{ color: 'white', fontWeight: "bold", marginLeft: "50px" }}><FcLike style={{ width: '30px', height: '30px' }} /></Link>
            <Link href="/profile" style={{ color: 'white', fontWeight: "bold", marginLeft: "50px" }}>Profile</Link>
            <a onClick={handleLogout} style={{ cursor: 'pointer', color: 'white', fontWeight: "bold", marginLeft: "50px" }}>Logout</a>
          </>
        ) : (
          <>
            <Link href="/login" style={{ color: 'white', fontWeight: 'bold', marginLeft: '50px', textDecoration: 'none', padding: '5px 10px', borderRadius: '15px', backgroundColor: '#CD6839' }}>Login</Link>
             <Link href="/register" style={{ color: 'white', fontWeight: 'bold', marginLeft: '50px', textDecoration: 'none', padding: '5px 10px', borderRadius: '15px', backgroundColor: '#CD6839' }}>Register</Link>

          </>
        )}
        <ModeToggle/>
      </div>
      

      <style jsx>{`
        nav {
          padding: 0 20px;
        }
        .navLinks > * {
          transition: color 0.3s;
        }
        .navLinks > *:hover {
          color: red;
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
