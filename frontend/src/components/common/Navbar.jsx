import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setRole(localStorage.getItem("role") || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole("");
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">OrganLife</div>

      <ul className="nav-links">
        {role === "admin" ? 
        <li>
           <Link to="/admin/dashboard" className="nav-link">Home</Link>
        </li>  
        :<li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
      }
        <li>
          <Link to="/donors" className="nav-link">Donors</Link>
        </li>
        <li>
          <Link to="/recipients" className="nav-link">Recipients</Link>
        </li>

        {role === "admin" ? (
          <li>
            <div className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </div>
          </li>
        ) : (
          <li>
            <Link to="/login" className="nav-link">Login</Link>
          </li>
        )}
      </ul>

      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #16a34a;
          color: white;
          padding: 15px 30px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .nav-logo {
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          text-decoration: none;
          color: white;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: #d1fae5;
        }

        @media (max-width: 600px) {
          .navbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .nav-links {
            flex-direction: column;
            width: 100%;
            gap: 10px;
            margin-top: 10px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
