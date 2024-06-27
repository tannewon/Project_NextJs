'use client'

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav style={{ backgroundColor:"orange",color:'white' }}>
      <div className="logo" style={{borderRadius:'20px'}}>
      <Image   src="/ninedev.png" alt="logo nine dev" width={100} height={70} />
      </div >
      <div style={{ marginRight:"100px" }}>
      <Link style={{ color:'white',fontWeight: "bold",marginLeft:"100px" }} href="/">Home</Link>
      <Link style={{ color:'white',fontWeight: "bold",marginLeft:"100px" }} href="/product">Product</Link>
      <Link  style={{ color:'white',fontWeight: "bold",marginLeft:"100px" }} href="/about">About</Link>
      <Link  style={{ color:'white',fontWeight: "bold",marginLeft:"100px" }} href="/dashboard">Management</Link>
      <Link  style={{ color:'white',fontWeight: "bold",marginLeft:"300px" }} href="/login">Login</Link>
      <Link  style={{ color:'white',fontWeight: "bold",marginLeft:"100px" }} href="/register">Register</Link>

      </div>
    
    </nav>
  )
}

export default Navbar;