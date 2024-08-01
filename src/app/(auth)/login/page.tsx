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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };
    let hasErrors = false;

    if (!formData.email) {
      newErrors.email = "Email is required";
      hasErrors = true;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      hasErrors = true;
    }
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.get(USER_API_URL);
      const users = response.data;
      const user = users.find((user: any) => user.email === formData.email);

      if (user) {
        if (user.password === formData.password) {
          Cookies.set("user", JSON.stringify(user), { expires: 7 });
          localStorage.setItem("user", JSON.stringify(user));
          if (user.role === "admin") {
            router.push("/dashboard");
          } else {
            router.push("/");
          }
        } else {
          setErrors({ email: "", password: "Incorrect password" });
        }
      } else {
        setErrors({ email: "Email not found", password: "" });
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrors({
        email: "Login failed. Please try again later.",
        password: "Login failed. Please try again later.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <main style={{ justifyItems: "center", marginTop: '150px' }}>
      <div className="container mt-5">
        <div
          className="card p-4"
          style={{
            border: "1px solid orange",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          <form onSubmit={handleSubmit} style={{ padding: "40px", backgroundColor: '#FF6633', borderRadius: '10px' }}>
            <h2 style={{ textAlign: "center", color: "black" }}>Login</h2>
            <div className="mb-3 row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label" style={{ color: 'white', fontWeight: "bold" }}>
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
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label" style={{ color: 'white', fontWeight: "bold" }}>
                Password
              </label>
              <div className="col-sm-10" style={{ position: "relative" }}>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
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
                  {showPassword ? <EyeOff />  :  <Eye />}
                </span>
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
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
                marginTop: '40px'
              }}
            >
              Login
            </button>
            <div style={{ textAlign: "center", color: 'white' }}>
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
                    marginTop: '20px'
                  }}
                >
                  Register
                </button>
              </p>
            </div>
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
