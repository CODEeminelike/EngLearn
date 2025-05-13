// src/Components/Header.js
import React from "react";
import "./Header.css";
import { useAuth } from "../contexts/AuthContext"; // Đã import ở bước trước
import { useNavigate, Link } from "react-router-dom"; // Đã import ở bước trước

const Header = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleJoinNowClick = () => {
    if (currentUser) {
      // Nếu đã đăng nhập, chuyển đến Student Dashboard
      navigate("/student-dashboard");
    } else {
      // Nếu CHƯA đăng nhập, chuyển đến trang ĐĂNG NHẬP
      navigate("/login"); // << THAY ĐỔI Ở ĐÂY (từ /register sang /login)
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">EngLearn</Link>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
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