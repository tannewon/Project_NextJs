"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { USER_API_URL } from "@/lib/util";
import { Eye, EyeOff } from "lucide-react";
import { IoPersonOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(USER_API_URL, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        router.push("/login");
        alert("Registration successful");
      } catch (error) {
        console.error("Registration failed", error);
        alert("Registration failed");
      }
    }
  };

  return (
    <main style={{ justifyItems: "center", marginTop: "150px",marginBottom:'50px' }}>
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
          <div className="mb-3 row">
            <label
              htmlFor="inputName"
              className="col-sm-2 col-form-label"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Name
            </label>
            <div style={{ position: "relative" }}>
              <input
                name="name"
                type="text"
                placeholder="Enter name"
                className="form-control"
                id="inputName"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "40px",
                  border: errors.name ? "2px solid red" : "1px solid orange",
                  borderRadius: "5px",
                  padding: "0 50px",
                  boxSizing: "border-box",
                  marginTop: "10px",
                }}
              />
              <IoPersonOutline
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
              {errors.name && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    bottom: "-20px",
                    left: "0",
                  }}
                >
                  {errors.name}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3 row" style={{ marginTop: "20px" }}>
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
                  border: errors.email ? "2px solid red" : "1px solid orange",
                  borderRadius: "5px",
                  padding: "0 50px",
                  boxSizing: "border-box",
                  marginTop: "10px",
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
              {errors.email && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    bottom: "-20px",
                    left: "0",
                  }}
                >
                  {errors.email}
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
            <div style={{ position: "relative" }}>
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
                  border: errors.password ? "2px solid red" : "1px solid orange",
                  borderRadius: "5px",
                  padding: "0 50px",
                  boxSizing: "border-box",
                  marginTop: "10px",
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
                  top: "60%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
              {errors.password && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    bottom: "-20px",
                    left: "0",
                  }}
                >
                  {errors.password}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3 row" style={{ marginTop: "20px" }}>
            <label
              htmlFor="inputConfirmPassword"
              className="col-sm-2 col-form-label"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Confirm Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="form-control"
                id="inputConfirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "40px",
                  border: errors.confirmPassword
                    ? "2px solid red"
                    : "1px solid orange",
                  borderRadius: "5px",
                  padding: "0 50px",
                  boxSizing: "border-box",
                  marginTop: "10px",
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
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  position: "absolute",
                  top: "60%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </span>
              {errors.confirmPassword && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    bottom: "-20px",
                    left: "0",
                  }}
                >
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              marginTop: "30px",
              height: "40px",
              backgroundColor: "orange",
              border: "1px solid gray",
              fontWeight:"bold",
              color:'white',
              borderRadius:'5px',
            fontSize:'15px'
            }}
          >
            Register
          </button>
          <p
            className="mt-3"
            style={{
              textAlign: "center",
              fontSize: "16px",
              color: "black",
            }}
          >
            Already have an account?{" "}
            <button
              onClick={handleLoginRedirect}
              style={{
                background: "none",
                border: "none",
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
