import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import "./SubmissionHistory.css";

const SubmissionHistory = () => {
  const { currentUser } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const q = query(
          collection(db, "submissions"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const submissionsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubmissions(submissionsData);
      } catch (err) {
        setError("Lỗi khi tải lịch sử làm bài: " + err.message);
      }
      setLoading(false);
    };
    fetchSubmissions();
  }, [currentUser]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="submission-history">
      <h3>Lịch sử làm bài</h3>
      {submissions.length === 0 ? (
        <p>Chưa có bài làm nào.</p>
      ) : (
        <ul>
          {submissions.map((submission) => (
            <li key={submission.id} className="submission-item">
              <span>
                {submission.lessonTitle} - {submission.correctCount}/
                {submission.totalQuestions} câu đúng
              </span>
              <Link to={`/student-dashboard/submission-detail/${submission.id}`}>
                Xem chi tiết
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubmissionHistory;