// src/Components/StudentDashboard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth để lấy thông tin người dùng
import { auth as firebaseAuth } from '../firebase'; // Import instance auth của firebase để đăng xuất
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      navigate('/login'); // Chuyển về trang login sau khi đăng xuất
      console.log("Đã đăng xuất!");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      // Xử lý lỗi nếu cần
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', marginTop: '20px' }}>
      <h2>Student Dashboard</h2>
      {currentUser ? (
        <div>
          <p>Chào mừng, <strong>{currentUser.email}</strong>!</p>
          <p>Đây là khu vực dành cho học viên.</p>
          <button 
            onClick={handleLogout} 
            style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
          >
            Đăng Xuất
          </button>
        </div>
      ) : (
        <p>Vui lòng đăng nhập để xem nội dung này.</p>
      )}
    </div>
  );
};

export default StudentDashboard;