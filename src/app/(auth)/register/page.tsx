"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { USER_API_URL } from "@/lib/util";
import { Eye, EyeOff } from "lucide-react";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      }
    }
  };

  return (
    <main style={{ justifyContent: "center",marginTop:'150px' }}>
      <div className="container">
        <div
          className="card "
          style={{
            border: "1px solid orange",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          <form onSubmit={handleSubmit} style={{ padding: "40px" ,backgroundColor:'#FF6633',borderRadius:'10px'}}>
            <h2 style={{ textAlign: "center", color: "black" }}>Register</h2>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label" style={{ color:'white',fontWeight: "bold" }} >
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="inputName"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: "96%",
                  height: "40px",
                  border: errors.name ? "1px solid red" : "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "0 10px",
                  marginTop: "20px",
                }}
              />
              {errors.name && (
                <div className="invalid-feedback" style={{ color: "red" }}>
                  {errors.name}
                </div>
              )}
            </div>
            <div className="mb-3" style={{ marginTop: "20px" }}>
              <label htmlFor="staticEmail" className="form-label" style={{ color:'white',fontWeight: "bold" }}>
                Email
              </label>
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
                  border: errors.email ? "1px solid red" : "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "0 10px",
                  marginTop: "20px",
                }}
              />
              {errors.email && (
                <div className="invalid-feedback" style={{ color: "red" }}>
                  {errors.email}
                </div>
              )}
            </div>
            <div className="mb-3" style={{ marginTop: "20px", position: "relative" }}>
              <label htmlFor="inputPassword" className="form-label" style={{ color:'white',fontWeight: "bold" }}>
                Password
              </label>
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
                  border: errors.password ? "1px solid red" : "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "0 10px",
                  marginTop: "20px",
                }}
                
              />
              <span
                onClick={togglePasswordVisibility}
                style={{
                  position:'absolute',
                  top: "77%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
              {errors.password && (
                <div className="invalid-feedback" style={{ color: "red" }}>
                  {errors.password}
                </div>
              )}
            </div>
            <div className="mb-3" style={{ marginTop: "20px", position: "relative" }}>
              <label htmlFor="inputConfirmPassword" className="form-label" style={{ color:'white',fontWeight: "bold" }}>
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter confirm password"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                id="inputConfirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: "96%",
                  height: "40px",
                  border: errors.confirmPassword ? "1px solid red" : "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "0 10px",
                  marginTop: "20px",
                }}
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  position: "absolute",
                  top: "77%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </span>
              {errors.confirmPassword && (
               <div className="invalid-feedback" style={{ color: "red" }}>
                  {errors.confirmPassword}
                </div>
              )}
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
                marginTop: "40px",
                width: "100%",
                height: "40px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Register
            </button>
            <div style={{ marginTop: "20px", textAlign: "center",color:'white' }}>
              <p>
                Already have an account?
                <button
                  type="button"
                  onClick={handleLoginRedirect}
                  style={{
                    background: "none",
                    border: "none",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Login
                </button>{" "}
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
          .form-control,
          .form-select,
          .btn {
            width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .card {
            padding: 10px !important;
          }
          .form-control,
          .form-select,
          .btn {
            width: 100% !important;
          }
        }
      `}</style>
    </main>
  );
};

export default Register;
