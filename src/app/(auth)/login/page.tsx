"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { USER_API_URL } from "@/lib/util";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.get(USER_API_URL);
      const user = response.data.find((user: any) => user.email === formData.email);
      if (user) {
        if (user.password === formData.password) {
          Cookies.set("user", JSON.stringify(user), { expires: 7 });
          router.push("/");
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, password: "Incorrect password" }));
        }
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "Email not found" }));
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Login failed. Please try again later.",
        password: "Login failed. Please try again later.",
      }));
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
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: "96%",
                    height: "40px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginTop: "20px",
                    padding: "0 10px",
                  }}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
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
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="inputPassword"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: "96%",
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
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    marginTop: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
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
                    marginTop:'20px'
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
                width: "100%",
                height: "40px",
                fontSize: "16px",
                fontWeight: "bold",
                marginTop:'20px'

              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 600px) {
          .card {
            padding: 20px !important;
          }
          .form-control {
            width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .card {
            padding: 10px !important;
          }
          .form-control {
            width: 100% !important;
          }
        }
        .is-invalid {
          border-color: red !important;
        }
        .invalid-feedback {
          color: red;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </main>
  );
};

export default Login;
