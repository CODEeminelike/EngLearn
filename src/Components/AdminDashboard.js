import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import CreateLesson from "./CreateLesson";
import EditLesson from "./EditLesson";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy danh sách lessons từ Firestore
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lessons"));
        const lessonsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLessons(lessonsData);
      } catch (err) {
        setError("Lỗi khi tải danh sách lessons: " + err.message);
      }
      setLoading(false);
    };
    fetchLessons();
  }, []);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-dashboard">
    <br></br>
    <br></br>
    <br></br>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin-dashboard/create-lesson">Tạo Lesson Mới</Link>
          </li>
        </ul>
      </nav>
      <h3>Danh sách Lessons</h3>
      {lessons.length === 0 ? (
        <p>Chưa có lesson nào.</p>
      ) : (
        <ul className="lessons-list">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="lesson-item">
              <span>{lesson.title}</span>
              <Link to={`/admin-dashboard/edit-lesson/${lesson.id}`}>
                Chỉnh sửa
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Routes>
        <Route path="create-lesson" element={<CreateLesson />} />
        <Route path="edit-lesson/:lessonId" element={<EditLesson />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;