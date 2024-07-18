"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { FcBusinessman, FcHome, FcSoundRecordingCopyright } from "react-icons/fc";
import Cookies from "js-cookie";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('user');
    router.push('/login');
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <header style={{ backgroundColor: "#333", color: "#fff", padding: "20px", height: '80px' }}>
        <form className="searchForm" style={{ alignItems: 'center', display: 'flex' }} onSubmit={handleSearch}>
          <input 
            type="text" 
            name="search" 
            placeholder="Search products" 
            style={{ width: '250px', height: '33px', border: 'none', borderRadius: '15px' }} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" style={{ width: '35px', height: '35px', marginLeft: '5px', border: 'none', borderRadius: '15px' }}>
            <FaSearch />
          </button>
          <h1 style={{ marginLeft: '400px', color: 'orange' }}>Dashboard</h1>
        </form>
      </header>
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
            height: "100%",
          }}
        >
          <div>
            <h2 style={{ color: "#fff", marginLeft: '30px' }}>Dashboard</h2>
            <hr />
            <nav style={{ display: "block" }}>
              <p style={{ marginTop: "20px" }}>
                <Link href="/dashboard">
                  <FcHome />
                  <span style={{ color: "#fff", textDecoration: "none", marginLeft: '10px' }}>Home</span>
                </Link>
              </p>
              <p style={{ marginTop: "20px" }}>
                <Link href="/dashboard/product">
                  <FcSoundRecordingCopyright />
                  <span style={{ color: "#fff", textDecoration: "none", marginLeft: '10px' }}>Product</span>
                </Link>
              </p>
              <p style={{ marginTop: "20px" }}>
                <Link href="/dashboard/user">
                  <FcBusinessman />
                  <span style={{ color: "#fff", textDecoration: "none", marginLeft: '10px' }}>User</span>
                </Link>
              </p>
            </nav>
          </div>
          <button onClick={handleLogout} style={{ color: "#fff", textDecoration: "none", background: "none", border: "none", cursor: "pointer" }}>
            Logout
          </button>
        </aside>
        <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
