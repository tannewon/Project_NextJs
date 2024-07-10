"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FaSearch } from "react-icons/fa";
import { ModeToggle } from "./ModeToggle";
import { FcLike } from "react-icons/fc";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('user');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav style={{display:'flex', backgroundColor: "orange", color: 'white', height: '130px', justifyContent: 'space-between', padding: '0 20px' }}>
      <div style={{ flex: '0 0 auto' }}>
        <Image src="/ninedev.png" alt="logo nine dev" width={100} height={70} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center',marginRight:'100px' }}>
        <Link href="/" style={{ color: 'white', fontWeight: "bold", marginLeft: "70px" }}>Home</Link>
        <Link href="/product" style={{ color: 'white', fontWeight: "bold", marginLeft: "70px" }}>Product</Link>
        <Link href="/about" style={{ color: 'white', fontWeight: "bold", marginLeft: "70px" }}>About</Link>
        <Link href="/dashboard" style={{ color: 'white', fontWeight: "bold", marginLeft: "70px" }}>Management</Link>
        <form style={{ display: 'flex', alignItems: 'center',marginLeft: "50px" }}>
          <input type="text" name="search" placeholder="Search products" style={{ width: '200px', height: '30px' }} />
          <button type="submit" style={{ width: '35px', height: '35px', marginLeft: '5px' }}><FaSearch /></button>
        </form>
        <ModeToggle />
  

        {isLoggedIn ? (
          <>
            <Link href="/product/favorite" style={{ color: 'white', fontWeight: "bold", marginLeft: "20px" }}><FcLike style={{ width:'20px',height:'20px'}} /></Link>
            <Link href="/profile" style={{ color: 'white', fontWeight: "bold", marginLeft: "20px" }}>Profile</Link>
            <a onClick={handleLogout} style={{ cursor: 'pointer', color: 'white', fontWeight: "bold", marginLeft: "20px" }}>Logout</a>
          </>
        ) : (
          <>
            <Link href="/login" style={{ color: 'white', fontWeight: "bold", marginLeft: "20px" }}>Login</Link>
            <Link href="/register" style={{ color: 'white', fontWeight: "bold", marginLeft: "20px" }}>Register</Link>
          </>
        )}
      </div>

      

      {/* Media Queries for Responsive Design */}
      <style jsx>{`
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
