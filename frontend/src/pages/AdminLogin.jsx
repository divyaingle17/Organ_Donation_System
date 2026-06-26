import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") setIsLoggedIn(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", credentials, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("role", "admin");
        setIsLoggedIn(true);
        navigate("/admin/dashboard");
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error logging in. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    toast.info("Logged out successfully");
    navigate("/admin/login");
  };

  if (isLoggedIn) {
    return (
      <div className="admin-login-page">
        <h1>Welcome, Admin</h1>
        <button onClick={handleLogout}>Logout</button>

        <style>{`
          .admin-login-page {
            max-width: 400px;
            margin: 100px auto;
            padding: 30px;
            background-color: #f9fafb;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            font-family: Arial, sans-serif;
            text-align: center;
          }

          h1 {
            color: #16a34a;
            margin-bottom: 25px;
          }

          button {
            padding: 12px 20px;
            background-color: #16a34a;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s;
          }

          button:hover {
            background-color: #138d3a;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-login-page">
      <h1>Admin Login</h1>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            placeholder="admin@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </label>

        <button type="submit">Login</button>
      </form>

      <style>{`
        .admin-login-page {
          max-width: 400px;
          margin: 100px auto;
          padding: 30px;
          background-color: #f9fafb;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }

        h1 {
          text-align: center;
          color: #16a34a;
          margin-bottom: 25px;
        }

        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        label {
          display: flex;
          flex-direction: column;
          font-weight: 500;
          color: #333;
        }

        input {
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        button {
          padding: 12px;
          background-color: #16a34a;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        button:hover {
          background-color: #138d3a;
        }

        @media (max-width: 500px) {
          .admin-login-page {
            margin: 50px 20px;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
