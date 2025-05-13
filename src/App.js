// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Đường dẫn có thể cần điều chỉnh

import './App.css';
import Header from './Components/Header';
import Banner from "./Components/Banner";
import AboutUs from './Components/AboutUs';
import Register from './Components/Register';
import Login from './Components/Login';
import StudentDashboard from './Components/StudentDashboard'; // Sẽ tạo ở bước tiếp theo

// Component cho trang chủ (ví dụ)
const HomePage = () => (
  <>
    <Banner />
    <AboutUs />
    {/* Thêm các component Register và Login ở đây nếu muốn chúng ở trang chủ
        Hoặc tạo các route riêng cho chúng như bên dưới.
        <hr style={{ margin: "40px 0"}} /> 
        <Register /> 
        <hr style={{ margin: "40px 0"}} /> 
        <Login /> 
    */}
  </>
);

// Component bảo vệ route, yêu cầu đăng nhập
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    // Bạn có thể lưu lại trang họ muốn vào để redirect sau khi login thành công (state của Navigate)
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Component chứa nội dung chính của App để Header và Routes có thể dùng chung context
function AppLayout() {
  return (
    <div className="App">
      <Header />
      <main> {/* Nên bọc nội dung chính trong <main> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          {/* Thêm các Route khác nếu cần */}
          <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirect về trang chủ nếu không tìm thấy route */}
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider> {/* AuthProvider bọc ngoài cùng để toàn bộ app truy cập được context */}
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;