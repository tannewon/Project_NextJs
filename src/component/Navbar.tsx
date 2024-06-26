'use client'

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav style={{ backgroundColor:"black" }}>
      <div className="logo">
      <Image src="/ninedev.png" alt="logo nine dev" width={100} height={70} />
      </div >
      <div style={{ marginRight:"400px" }}>
      <Link href="/">Home</Link>
      <Link href="/about"style={{ marginLeft:"100px" }}>About</Link>
      <Link href="/dashboard"style={{ marginLeft:"100px" }}>Dashboard</Link>
      <Link href="/login"style={{ marginLeft:"100px" }}>Login</Link>
      <Link href="/register"style={{ marginLeft:"100px" }}>Register</Link>

      </div>
    
    </nav>
  )
}

export default Navbar;