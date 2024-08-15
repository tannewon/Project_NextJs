"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { USER_API_URL } from "@/lib/util";
import { Eye, EyeOff } from "lucide-react";
import { MdMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "email") setEmailError(""); // Clear email error when user starts typing
    if (name === "password") setPasswordError(""); // Clear password error when user starts typing
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rememberMe) {
      setError("You must agree to remember me to log in.");
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
          setPasswordError("Incorrect password.");
        }
      } else {
        setEmailError("Email not found.");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("An error occurred during login.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <main style={{ justifyItems: "center", marginTop: "150px" }}>
      <div
        className="card p-4"
        style={{
          border: "2px solid orange",
          borderRadius: "10px",
          maxWidth: "500px",
          margin: "auto",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "linear-gradient(to right, orange, red, #FF9933)",
            padding: "40px",
            borderRadius: "10px",
          }}
        >
          {error && (
            <div
              style={{
                backgroundColor: "#f8d7da",
                color: "#721c24",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
          <div className="mb-3 row">
            <label
              htmlFor="staticEmail"
              className="col-sm-2 col-form-label"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Email
            </label>
            <div style={{ position: "relative" }}>
              <input
                name="email"
                placeholder="Enter email"
                type="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "40px",
                  border: `1px solid ${emailError ? "red" : "orange"}`,
                  marginTop: "10px",
                  borderRadius: "5px",
                  padding: "0 40px 0 50px",
                  boxSizing: "border-box",
                }}
              />
              <MdMailOutline
                style={{
                  position: "absolute",
                  top: "60%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  color: "#888",
                  width: "25px",
                  height: "25px",
                }}
              />
              {emailError && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    bottom: "-20px",
                    left: "0",
                  }}
                >
                  {emailError}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3 row" style={{ marginTop: "20px" }}>
            <label
              htmlFor="inputPassword"
              className="col-sm-2 col-form-label"
              style={{ fontWeight: "bold", color: "black" }}
            >
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
                  width: "100%",
                  height: "40px",
                  border: `1px solid ${passwordError ? "red" : "orange"}`,
                  marginTop: "10px",
                  borderRadius: "5px",
                  padding: "0 40px 0 50px",
                  boxSizing: "border-box",
                }}
              />
              <RiLockPasswordLine
                style={{
                  position: "absolute",
                  top: "60%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  color: "#888",
                  width: "25px",
                  height: "25px",
                }}
              />
              <span
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "65%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
              {passwordError && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    bottom: "-20px",
                    left: "0",
                  }}
                >
                  {passwordError}
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              position: "relative",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <div className="mb-3 row" style={{ marginTop: "20px" }}>
              <div
                className="col-sm-10 offset-sm-2"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                  id="rememberMe"
                  style={{ marginRight: "10px" }}
                />
                <label
                  htmlFor="rememberMe"
                  style={{ fontSize: "16px", color: "black" }}
                >
                  Remember me
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-3"
            style={{
              backgroundColor: "#FF8C00",
              color: "white",
              border: "1px solid gray",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
              width: "100%",
              height: "40px",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn-primary mt-3"
            style={{
              backgroundColor: "white",
              border: "1px solid orange",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
              width: "100%",
              height: "40px",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              color: "black",
            }}
          >
            <FcGoogle size={20} /> Login with Google
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <hr
              style={{ flex: 1, border: "1px solid #ccc", margin: "0 10px" }}
            />
            <span style={{ whiteSpace: "nowrap", color: "black" }}>OR</span>
            <hr
              style={{ flex: 1, border: "1px solid #ccc", margin: "0 10px" }}
            />
          </div>
          <p
            className="mt-3"
            style={{
              textAlign: "center",
              fontSize: "16px",
              color: "black",
            }}
          >
            Don't have an account?{" "}
            <button
              onClick={handleRegisterRedirect}
              style={{
                background: "none",
                border: "none",
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Register
            </button>
          </p>
        </form>
      </div>
      <style jsx>{`
        @media (max-width: 600px) {
          .card {
            width: 90%;
            margin: auto;
          }
        }
      `}</style>
    </main>
  );
};

export default Login;
