// src/Components/Header.js
import React from "react";
import "./Header.css"; // File CSS riêng để style

const Header = () => {
  return (
    <header className="header">
      <div className="logo">EngLearn</div>
      <nav className="nav">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Documentation</a></li>
        </ul>
      </nav>
      <button className="buy-now">JoinNow →</button>
    </header>
  );
};

export default Header;
