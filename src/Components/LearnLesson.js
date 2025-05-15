import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import "./LearnLesson.css";

const LearnLesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showHints, setShowHints] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy dữ liệu lesson
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonDoc = await getDoc(doc(db, "lessons", lessonId));
        if (lessonDoc.exists()) {
          setLesson({ id: lessonDoc.id, ...lessonDoc.data() });
          setAnswers(new Array(lessonDoc.data().questions.length).fill(""));
          setShowHints(new Array(lessonDoc.data().questions.length).fill(false));
        } else {
          setError("Lesson không tồn tại.");
        }
      } catch (err) {
        setError("Lỗi khi tải lesson: " + err.message);
      }
      setLoading(false);
    };
    fetchLesson();
  }, [lessonId]);

  // Xử lý chọn đáp án
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Xử lý hiển thị gợi ý
  const toggleHint = (index) => {
    const newShowHints = [...showHints];
    newShowHints[index] = !newShowHints[index];
    setShowHints(newShowHints);
  };

  // Xử lý nộp bài
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answers.some((answer) => !answer)) {
      setError("Vui lòng trả lời tất cả các câu hỏi.");
      return;
    }
    let correctCount = 0;
    lesson.questions.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) {
        correctCount++;
      }
    });
    setResult({
      correct: correctCount,
      total: lesson.questions.length,
    });

    // Lưu bài làm vào Firestore
    try {
      await addDoc(collection(db, "submissions"), {
        userId: currentUser.uid,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        answers: answers,
        correctCount: correctCount,
        totalQuestions: lesson.questions.length,
        submittedAt: new Date(),
      });
    } catch (err) {
      setError("Lỗi khi lưu bài làm: " + err.message);
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!lesson) return <p>Lesson không tồn tại.</p>;

  return (
    <div className="learn-lesson">
      <h2>{lesson.title}</h2>
      <div className="reading-content">
        <h3>Nội dung đọc</h3>
        <p>{lesson.reading}</p>
      </div>
      <h3>Câu hỏi trắc nghiệm</h3>
      {result ? (
        <div className="result">
          <p>
            Kết quả: {result.correct}/{result.total} câu đúng
          </p>
          <button onClick={() => navigate("/student-dashboard/lessons")}>
            Quay lại danh sách lessons
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {lesson.questions.map((q, index) => (
            <div key={index} className="question">
              <p>
                <strong>Câu hỏi {index + 1}:</strong> {q.questionText}
              </p>
              {q.options.map((option, optIndex) => (
                <div key={optIndex} className="option">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  <label>{option}</label>
                </div>
              ))}
              <button
                type="button"
                className="hint-button"
                onClick={() => toggleHint(index)}
              >
                {showHints[index] ? "Ẩn gợi ý" : "Hiện gợi ý"}
              </button>
              {showHints[index] && (
                <p className="hint">
                  <strong>Gợi ý:</strong> {q.hint}
                </p>
              )}
            </div>
          ))}
          {error && <p className="error">{error}</p>}
          <button type="submit">Nộp bài</button>
        </form>
      )}
    </div>
  );
};

export default LearnLesson;