import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./SubmissionDetail.css";

const SubmissionDetail = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissionAndLesson = async () => {
      try {
        // Lấy dữ liệu bài làm
        const submissionDoc = await getDoc(doc(db, "submissions", submissionId));
        if (submissionDoc.exists()) {
          const submissionData = { id: submissionDoc.id, ...submissionDoc.data() };
          setSubmission(submissionData);

          // Lấy dữ liệu lesson tương ứng
          const lessonDoc = await getDoc(doc(db, "lessons", submissionData.lessonId));
          if (lessonDoc.exists()) {
            setLesson({ id: lessonDoc.id, ...lessonDoc.data() });
          } else {
            setError("Lesson không tồn tại.");
          }
        } else {
          setError("Bài làm không tồn tại.");
        }
      } catch (err) {
        setError("Lỗi khi tải chi tiết bài làm: " + err.message);
      }
      setLoading(false);
    };
    fetchSubmissionAndLesson();
  }, [submissionId]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!submission || !lesson) return <p>Dữ liệu không tồn tại.</p>;

  return (
    <div className="submission-detail">
      <h2>Chi tiết bài làm: {submission.lessonTitle}</h2>
      <p>
        Kết quả: {submission.correctCount}/{submission.totalQuestions} câu đúng
      </p>
      <h3>Câu hỏi và đáp án</h3>
      {lesson.questions.map((q, index) => (
        <div key={index} className="question">
          <p>
            <strong>Câu hỏi {index + 1}:</strong> {q.questionText}
          </p>
          <p>
            <strong>Lựa chọn của bạn:</strong>{" "}
            {submission.answers[index] || "Chưa trả lời"}
          </p>
          <p>
            <strong>Đáp án đúng:</strong> {q.correctAnswer}
          </p>
          <p>
            <strong>Gợi ý:</strong> {q.hint}
          </p>
        </div>
      ))}
      <button onClick={() => navigate("/student-dashboard/submission-history")}>
        Quay lại lịch sử làm bài
      </button>
    </div>
  );
};

export default SubmissionDetail;