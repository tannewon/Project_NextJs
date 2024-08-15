"use client";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa"; // Import các icon từ react-icons
import Image from "next/image";
import logo from "../../public/logoadmin.png"; // Import logo

const Footer = () => {
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");

  if (isDashboard) {
    return null;
  }

  return (
    <footer
      style={{
        background: "linear-gradient(to right, orange, #FF4040, orange)",
        color: "white",
        padding: "20px 0",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ flex: "1" }}>
            <div style={{ color: "white", marginBottom: "10px" }}>
              <Image src={logo} alt="Logo" width={100} height={100} />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#d0d0d0" }}>
                &copy; 2024 Your Company. All rights reserved.
              </p>
              <div style={{ marginTop: "10px" }}>
                <a
                  href="https://facebook.com"
                  style={{ color: "white", margin: "0 10px" }}
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  style={{ color: "white", margin: "0 10px" }}
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://instagram.com"
                  style={{ color: "white", margin: "0 10px" }}
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://linkedin.com"
                  style={{ color: "white", margin: "0 10px" }}
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div style={{ flex: "1" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff" }}>
              Quick Links
            </h3>
            <ul style={{ marginTop: "10px", listStyle: "none", padding: "0" }}>
              <li>
                <a
                  href="/"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "5px 0",
                    display: "block",
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/product"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "5px 0",
                    display: "block",
                  }}
                >
                  Product
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "5px 0",
                    display: "block",
                  }}
                >
                  Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "5px 0",
                    display: "block",
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div style={{ flex: "1" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff" }}>
              Contact Us
            </h3>
            <ul style={{ marginTop: "10px", listStyle: "none", padding: "0" }}>
              <li style={{ color: "white" }}>101b le huu trac, phuoc my</li>
              <li style={{ color: "white" }}>Da Nang</li>
              <li style={{ color: "white" }}>Email: info@yourcompany.com</li>
              <li style={{ color: "white" }}>Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
