  // Navbar.jsx
  "use client"
  import Image from "next/image";
  import Link from "next/link";
  import { useEffect, useState } from 'react';
  import Cookies from 'js-cookie';
  import { useRouter } from 'next/navigation';
  import { FaSearch } from "react-icons/fa";
  import { ModeToggle } from "./ModeToggle";
  

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
      <nav style={{ backgroundColor: "orange", color: 'white',height:'100px' }}>
        <div className="logo">
          <Image src="/ninedev.png" alt="logo nine dev" width={100} height={70} />
        </div>
        <div style={{ marginRight: "200px" }}>

          <Link style={{ color: 'white', fontWeight: "bold", marginLeft: "100px" }} href="/">Home</Link>
          <Link style={{ color: 'white', fontWeight: "bold", marginLeft: "100px" }} href="/product">Product</Link>
          <Link style={{ color: 'white', fontWeight: "bold", marginLeft: "100px" }} href="/about">About</Link>
          <Link style={{ color: 'white', fontWeight: "bold", marginLeft: "100px" }} href="/dashboard">Management</Link>

          {isLoggedIn ? (
            <>
              <Link style={{ color: 'white', fontWeight: "bold", marginLeft: "50px" }} href="/product/favorite">Favorite</Link>
              <Link style={{ color: 'white', fontWeight: "bold", marginLeft: "50px" }} href="/profile">Profile</Link>
              <a style={{ cursor: 'pointer', color: 'white', fontWeight: "bold", marginLeft: "50px" }} onClick={handleLogout}>Logout</a>
            </>
          ) : (
            <>
              <Link style={{ color: 'white', fontWeight: "bold", marginLeft: "100px" }} href="/login">Login</Link>
              <Link style={{ color: 'white', fontWeight: "bold", marginLeft: "100px" }} href="/register">Register</Link>
            </>
          )}

          <div>
            <form style={{ display: 'flex', alignItems: 'center', marginLeft: "400px", marginTop: "10px" }}>
              <input style={{ width: '300px', height: '30px' }} type="text" name="search" placeholder="Search products" />
              <button style={{ width: '35px', height: '35px' }} type="submit"><FaSearch /></button>
              <ModeToggle/>
            </form>
          </div>

        </div>
      </nav>
    );
  };

  export default Navbar;
