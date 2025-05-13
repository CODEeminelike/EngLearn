// src/Components/Header.js
import React from "react";
import "./Header.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleJoinNowClick = () => {
    if (currentUser) {
      navigate("/student-dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">EngLearn</Link>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          {/* THAY ĐỔI DÒNG DƯỚI ĐÂY */}
          <li><Link to="/#about-us-section">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/documentation">Documentation</Link></li>
        </ul>
      </nav>
      <button className="buy-now" onClick={handleJoinNowClick}>
        {currentUser ? "Dashboard" : "JoinNow →"}
      </button>
    </header>
  );
};

export default Header;