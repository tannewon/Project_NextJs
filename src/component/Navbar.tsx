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

  const handleSearch = (e:any) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/product?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav style={{ display: 'flex', backgroundColor: "orange", color: 'white', height: '130px', justifyContent: 'space-between', padding: '0 20px' }}>
      <div style={{ flex: '0 0 auto' }}>
        <Image src="/ninedev.png" alt="nine dev logo" width={100} height={70} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}>
        <Link href="/" style={{ color: 'white', fontWeight: "bold", marginLeft: "70px" }}>Home</Link>
        <Link href="/product" style={{ color: 'white', fontWeight: "bold", marginLeft: "70px" }}>Product</Link>
        <Link href="/dashboard" style={{ color: 'white', fontWeight: "bold", marginLeft: "70px" }}>Management</Link>
        <form style={{ display: 'flex', alignItems: 'center', marginLeft: "50px" }} onSubmit={handleSearch}>
          <input 
            type="text" 
            name="search" 
            placeholder="Search products" 
            style={{ width: '200px', height: '30px' }} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" style={{ width: '35px', height: '35px', marginLeft: '5px' }}><FaSearch /></button>
        </form>
        <ModeToggle />
        
        {isLoggedIn ? (
          <>
            <CartPage />
            <Link href="/product/favorite" style={{ color: 'white', fontWeight: "bold", marginLeft: "20px" }}>Favorite<FcLike style={{ width:'20px',height:'20px'}} /></Link>
            <Link href="/profile" style={{ color: 'white', fontWeight: "bold", marginLeft: "30px" }}>Profile</Link>
            <a onClick={handleLogout} style={{ cursor: 'pointer', color: 'white', fontWeight: "bold", marginLeft: "20px" }}>Logout</a>
          </>
        ) : (
          <>
            <Link href="/login" style={{ color: 'white', fontWeight: "bold", marginLeft: "20px" }}>Login</Link>
            <Link href="/register" style={{ color: 'white', fontWeight: "bold", marginLeft: "20px" }}>Register</Link>
          </>
        )}
      </div>

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
