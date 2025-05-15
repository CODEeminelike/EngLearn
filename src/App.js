import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import "./App.css";
import Header from "./Components/Header";
import Banner from "./Components/Banner";
import AboutUs from "./Components/AboutUs";
import Register from "./Components/Register";
import Login from "./Components/Login";
import StudentDashboard from "./Components/StudentDashboard";
import CreateLesson from "./Components/CreateLesson";
import AdminDashboard from "./Components/AdminDashboard"; // Thêm import

// Component cho trang chủ
const HomePage = () => (
  <>
    <Banner />
    <section id="aboutus">
      <AboutUs />
    </section>
  </>
);

// Component bảo vệ route, yêu cầu đăng nhập và quyền admin nếu cần ///////////
function ProtectedRoute({ children, requireAdmin = false }) {
  const { currentUser, isAdmin } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/student-dashboard" replace />;
  }
  return children;
}

// Component chứa nội dung chính của App
function AppLayout() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/student-dashboard/*"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-lesson"
            element={
              <ProtectedRoute requireAdmin={true}>
                <CreateLesson />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;