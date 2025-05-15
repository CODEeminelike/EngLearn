import React from "react";
import "./Header.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleJoinNowClick = () => {
    if (currentUser) {
      navigate("/student-dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleAboutUsClick = (e) => {
    e.preventDefault();
    const aboutUsSection = document.getElementById("aboutus");
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">EngLearn</Link>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>
            <a href="#aboutus" onClick={handleAboutUsClick}>About Us</a>
          </li>
          <li><a href="mailto:holekhanhlinh@gmail.com">Contact</a></li>
          <li><Link to="/documentation">Documentation</Link></li>
          {currentUser && isAdmin && (
            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
          )}
        </ul>
      </nav>
      <button className="buy-now" onClick={handleJoinNowClick}>
        {currentUser ? "Dashboard" : "JoinNow →"}
      </button>
    </header>
  );
};

export default Header;