"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { USER_API_URL } from "@/lib/util";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }
    try {
      const response = await axios.get(USER_API_URL);
      const user = response.data.find(
        (user:any) =>
          user.email === formData.email && user.password === formData.password
      );
      if (user) {
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
        router.push("/");
        alert("Login successful");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again later.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <main style={{ justifyItems: "center" }}>
      <div className="container mt-5">
        <div
          className="card p-4"
          style={{
            border: "1px solid orange",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            maxWidth: "600px",
            margin: "auto",
          }}
        >
          <form onSubmit={handleSubmit} style={{ padding: "40px" }}>
            <h2 style={{ textAlign: "center", color: "orange" }}>Login</h2>
            <div className="mb-3 row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  name="email"
                  placeholder="Enter email"
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: "500px",
                    height: "40px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginTop: "20px",
                    padding: "0 10px",
                  }}
                />
              </div>
            </div>
            <div className="mb-3 row" style={{ marginTop: "20px" }}>
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Password
              </label>
              <div className="col-sm-10" style={{ position: "relative" }}>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="form-control"
                  id="inputPassword"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: "500px",
                    height: "40px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginTop: "20px",
                    padding: "0 10px",
                  }}
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    marginTop: "10px",
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <p>
                Don’t have an account?
                <button
                  type="button"
                  onClick={handleRegisterRedirect}
                  style={{
                    fontSize: "17px",
                    background: "none",
                    border: "none",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Register
                </button>
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              style={{
                backgroundColor: "#FF8C00",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "5px",
                marginTop: "30px",
                width: "520px",
                height: "40px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
