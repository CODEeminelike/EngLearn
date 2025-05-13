// src/Components/Header.js
import React from "react";
import "./Header.css";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate và Link

const Header = () => {
  const { currentUser } = useAuth(); // Lấy thông tin người dùng hiện tại từ context
  const navigate = useNavigate(); // Hook để điều hướng

  const handleJoinNowClick = () => {
    if (currentUser) {
      // Nếu đã đăng nhập, chuyển đến Student Dashboard
      navigate("/student-dashboard");
    } else {
      // Nếu chưa đăng nhập, chuyển đến trang đăng ký (hoặc trang đăng nhập tùy bạn muốn)
      navigate("/register");
    }
  };

  // (Tùy chọn) Xử lý đăng xuất trực tiếp từ Header nếu muốn
  // const handleLogout = async () => { ... }

  return (
    <header className="header">
      {/* Sử dụng Link để logo điều hướng về trang chủ */}
      <Link to="/" className="logo">EngLearn</Link>
      
      <nav className="nav">
        <ul>
          {/* Sử dụng Link cho các mục điều hướng để có trải nghiệm SPA tốt hơn */}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about-us">About Us</Link></li> {/* Tạo route /about-us nếu cần */}
          <li><Link to="/contact">Contact</Link></li>   {/* Tạo route /contact nếu cần */}
          <li><Link to="/documentation">Documentation</Link></li> {/* Tạo route /documentation nếu cần */}
        </ul>
      </nav>
      
      <button className="buy-now" onClick={handleJoinNowClick}>
        {currentUser ? "Dashboard" : "JoinNow →"}
      </button>
      
      {/* Hoặc bạn có thể hiển thị nút Đăng nhập/Đăng ký nếu chưa login,
          và tên người dùng/nút Đăng xuất nếu đã login */}
      {/* {currentUser ? (
        <>
          <span style={{marginRight: '10px'}}>Chào, {currentUser.displayName || currentUser.email}</span>
          <button onClick={handleLogout}>Đăng Xuất</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/login')} style={{marginRight: '10px'}}>Đăng Nhập</button>
          <button className="buy-now" onClick={() => navigate('/register')}>JoinNow →</button>
        </>
      )}
      */}
    </header>
  );
};

export default Header;