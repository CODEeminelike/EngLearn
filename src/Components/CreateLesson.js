import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import db từ firebase.js
import "./CreateLesson.css";

const CreateLesson = () => {
  const navigate = useNavigate();
  const [lesson, setLesson] = useState({
    title: "",
    reading: "",
    questions: [],
  });
  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    hint: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Xử lý thay đổi input cho lesson
  const handleLessonChange = (e) => {
    const { name, value } = e.target;
    setLesson((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi input cho câu hỏi mới
  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi input cho các lựa chọn
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  // Thêm câu hỏi vào danh sách
  const addQuestion = () => {
    if (
      !newQuestion.questionText ||
      newQuestion.options.some((opt) => !opt) ||
      !newQuestion.correctAnswer ||
      !newQuestion.hint
    ) {
      setError("Vui lòng điền đầy đủ thông tin cho câu hỏi.");
      return;
    }
    if (!newQuestion.options.includes(newQuestion.correctAnswer)) {
      setError("Đáp án đúng phải là một trong các lựa chọn.");
      return;
    }
    setLesson((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setNewQuestion({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      hint: "",
    });
    setError("");
  };

  // Xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lesson.title || !lesson.reading || lesson.questions.length === 0) {
      setError("Vui lòng điền đầy đủ tiêu đề, nội dung đọc và ít nhất một câu hỏi.");
      return;
    }
    try {
      await addDoc(collection(db, "lessons"), {
        title: lesson.title,
        reading: lesson.reading,
        questions: lesson.questions,
        createdAt: new Date(),
      });
      setSuccess("Tạo lesson thành công!");
      setLesson({ title: "", reading: "", questions: [] });
      setTimeout(() => navigate("/student-dashboard"), 2000); // Quay lại dashboard sau 2s
    } catch (err) {
      setError("Lỗi khi tạo lesson: " + err.message);
    }
  };

  return (
    <div className="create-lesson">
      <h2>Tạo Lesson Mới</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        {/* Lesson Title */}
        <div className="form-group">
          <label>Tiêu đề Lesson:</label>
          <input
            type="text"
            name="title"
            value={lesson.title}
            onChange={handleLessonChange}
            placeholder="Nhập tiêu đề lesson"
          />
        </div>
        {/* Reading Content */}
        <div className="form-group">
          <label>Nội dung đọc:</label>
          <textarea
            name="reading"
            value={lesson.reading}
            onChange={handleLessonChange}
            placeholder="Nhập nội dung đọc"
            rows="10"
          />
        </div>
        {/* Questions */}
        <h3>Câu hỏi trắc nghiệm</h3>
        <div className="question-form">
          <div className="form-group">
            <label>Câu hỏi:</label>
            <input
              type="text"
              name="questionText"
              value={newQuestion.questionText}
              onChange={handleQuestionChange}
              placeholder="Nhập câu hỏi"
            />
          </div>
          {/* Options */}
          {newQuestion.options.map((option, index) => (
            <div className="form-group" key={index}>
              <label>Lựa chọn {index + 1}:</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Nhập lựa chọn ${index + 1}`}
              />
            </div>
          ))}
          {/* Correct Answer */}
          <div className="form-group">
            <label>Đáp án đúng:</label>
            <input
              type="text"
              name="correctAnswer"
              value={newQuestion.correctAnswer}
              onChange={handleQuestionChange}
              placeholder="Nhập đáp án đúng (phải khớp với một lựa chọn)"
            />
          </div>
          {/* Hint */}
          <div className="form-group">
            <label>Gợi ý:</label>
            <input
              type="text"
              name="hint"
              value={newQuestion.hint}
              onChange={handleQuestionChange}
              placeholder="Nhập gợi ý cho câu hỏi"
            />
          </div>
          <button type="button" onClick={addQuestion}>
            Thêm câu hỏi
          </button>
        </div>
        {/* Hiển thị danh sách câu hỏi đã thêm */}
        {lesson.questions.length > 0 && (
          <div className="questions-list">
            <h4>Danh sách câu hỏi:</h4>
            {lesson.questions.map((q, index) => (
              <div key={index} className="question-item">
                <p>
                  <strong>Câu hỏi {index + 1}:</strong> {q.questionText}
                </p>
                <p>
                  <strong>Lựa chọn:</strong> {q.options.join(", ")}
                </p>
                <p>
                  <strong>Đáp án đúng:</strong> {q.correctAnswer}
                </p>
                <p>
                  <strong>Gợi ý:</strong> {q.hint}
                </p>
              </div>
            ))}
          </div>
        )}
        {/* Submit Button */}
        <button type="submit">Tạo Lesson</button>
      </form>
    </div>
  );
};

export default CreateLesson;