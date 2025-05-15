import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./LessonList.css";

const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div className="lesson-list">
      <h3>Danh sách Lessons</h3>
      {lessons.length === 0 ? (
        <p>Chưa có lesson nào.</p>
      ) : (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id} className="lesson-item">
              <span>{lesson.title}</span>
              <Link to={`/student-dashboard/learn-lesson/${lesson.id}`}>
                Học ngay
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LessonList;