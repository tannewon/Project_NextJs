// DashboardLayout.tsx

import React from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export const metadata = {
  title: "Nine Dev | Dashboard",
  description: "Danh Sach Hoc Vien Nine Dev",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <header style={{ backgroundColor: "#333", color: "#fff", padding: "20px",height:'100px'}}>
        <form className="searchForm" style={{  alignItems: 'center', marginLeft: "80px",display:'flex'  }}>
          <input 
            type="text" 
            name="search" 
            placeholder="Search products" 
            style={{ width: '250px', height: '33px', border: 'none',borderRadius:'15px' }} 
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" style={{ width: '35px', height: '35px', marginLeft: '5px', border: 'none',borderRadius:'15px' }}><FaSearch /></button>
          <h1 style={{ marginLeft:'400px',color:'orange'}}>Dashboard</h1>
        </form>
      </header>
      <div style={{ display: "flex", flex: 1, overflow: "auto" }}>
        <aside
          style={{
            width: "200px",
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
            <h2 style={{ color: "#fff",marginLeft:'30px' }}>Dashboard</h2>
            <hr></hr>
            <nav style={{ display: "block" }}>
              <p style={{ marginTop: "20px" }}>
                <Link href="/dashboard">
                  <span style={{ color: "#fff", textDecoration: "none" }}>Home</span>
                </Link>
              </p>
              <p style={{ marginTop: "20px" }}>
                <Link href="/dashboard/product">
                  <span style={{ color: "#fff", textDecoration: "none" }}>Product</span>
                </Link>
              </p>
              <p style={{ marginTop: "20px" }}>
                <Link href="/dashboard/user">
                  <span style={{ color: "#fff", textDecoration: "none" }}>User</span>
                </Link>
              </p>
            </nav>
          </div>
          <Link href="/logout">
            <span style={{ color: "#fff", textDecoration: "none" }}>Logout</span>
          </Link>
        </aside>
        <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
