import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./CreateLesson.css"; // Tái sử dụng CSS từ CreateLesson

const EditLesson = () => {
  const { lessonId } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
  const [editQuestion, setEditQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    hint: "",
  });

  // Lấy dữ liệu lesson từ Firestore
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonDoc = await getDoc(doc(db, "lessons", lessonId));
        if (lessonDoc.exists()) {
          setLesson(lessonDoc.data());
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

  // Xử lý thay đổi input cho các lựa chọn của câu hỏi mới
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  // Xử lý thay đổi input cho câu hỏi đang chỉnh sửa
  const handleEditQuestionChange = (e) => {
    const { name, value } = e.target;
    setEditQuestion((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi input cho các lựa chọn của câu hỏi đang chỉnh sửa
  const handleEditOptionChange = (index, value) => {
    const updatedOptions = [...editQuestion.options];
    updatedOptions[index] = value;
    setEditQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  // Thêm câu hỏi mới vào danh sách
  const addQuestion = () => {
    if (
      !newQuestion.questionText ||
      newQuestion.options.some((opt) => !opt) ||
      !newQuestion.correctAnswer ||
      !newQuestion.hint
    ) {
      setError("Vui lòng điền đầy đủ thông tin cho câu hỏi mới.");
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

  // Xóa câu hỏi khỏi danh sách
  const removeQuestion = (index) => {
    setLesson((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
    // Nếu đang chỉnh sửa câu hỏi bị xóa, hủy chỉnh sửa
    if (editingQuestionIndex === index) {
      setEditingQuestionIndex(null);
      setEditQuestion({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        hint: "",
      });
    }
  };

  // Bắt đầu chỉnh sửa câu hỏi
  const startEditQuestion = (index) => {
    setEditingQuestionIndex(index);
    setEditQuestion({ ...lesson.questions[index] });
  };

  // Lưu chỉnh sửa câu hỏi
  const saveEditQuestion = () => {
    if (
      !editQuestion.questionText ||
      editQuestion.options.some((opt) => !opt) ||
      !editQuestion.correctAnswer ||
      !editQuestion.hint
    ) {
      setError("Vui lòng điền đầy đủ thông tin cho câu hỏi đang chỉnh sửa.");
      return;
    }
    if (!editQuestion.options.includes(editQuestion.correctAnswer)) {
      setError("Đáp án đúng phải là một trong các lựa chọn.");
      return;
    }
    setLesson((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[editingQuestionIndex] = editQuestion;
      return { ...prev, questions: updatedQuestions };
    });
    setEditingQuestionIndex(null);
    setEditQuestion({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      hint: "",
    });
    setError("");
  };

  // Hủy chỉnh sửa câu hỏi
  const cancelEditQuestion = () => {
    setEditingQuestionIndex(null);
    setEditQuestion({
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
      await updateDoc(doc(db, "lessons", lessonId), {
        title: lesson.title,
        reading: lesson.reading,
        questions: lesson.questions,
        updatedAt: new Date(),
      });
      setSuccess("Cập nhật lesson thành công!");
      setTimeout(() => navigate("/admin-dashboard"), 2000);
    } catch (err) {
      setError("Lỗi khi cập nhật lesson: " + err.message);
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error && !lesson.title) return <p className="error">{error}</p>;

  return (
    <div className="create-lesson">
      <h2>Chỉnh sửa Lesson</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
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
        <h3>Câu hỏi trắc nghiệm</h3>
        <div className="question-form">
          <h4>Thêm câu hỏi mới</h4>
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
        {lesson.questions.length > 0 && (
          <div className="questions-list">
            <h4>Danh sách câu hỏi:</h4>
            {lesson.questions.map((q, index) => (
              <div key={index} className="question-item">
                {editingQuestionIndex === index ? (
                  <div className="edit-question-form">
                    <h5>Chỉnh sửa câu hỏi {index + 1}</h5>
                    <div className="form-group">
                      <label>Câu hỏi:</label>
                      <input
                        type="text"
                        name="questionText"
                        value={editQuestion.questionText}
                        onChange={handleEditQuestionChange}
                        placeholder="Nhập câu hỏi"
                      />
                    </div>
                    {editQuestion.options.map((option, optIndex) => (
                      <div className="form-group" key={optIndex}>
                        <label>Lựa chọn {optIndex + 1}:</label>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleEditOptionChange(optIndex, e.target.value)
                          }
                          placeholder={`Nhập lựa chọn ${optIndex + 1}`}
                        />
                      </div>
                    ))}
                    <div className="form-group">
                      <label>Đáp án đúng:</label>
                      <input
                        type="text"
                        name="correctAnswer"
                        value={editQuestion.correctAnswer}
                        onChange={handleEditQuestionChange}
                        placeholder="Nhập đáp án đúng"
                      />
                    </div>
                    <div className="form-group">
                      <label>Gợi ý:</label>
                      <input
                        type="text"
                        name="hint"
                        value={editQuestion.hint}
                        onChange={handleEditQuestionChange}
                        placeholder="Nhập gợi ý"
                      />
                    </div>
                    <button type="button" onClick={saveEditQuestion}>
                      Lưu chỉnh sửa
                    </button>
                    <button type="button" onClick={cancelEditQuestion}>
                      Hủy
                    </button>
                  </div>
                ) : (
                  <div className="question-display">
                    <div>
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
                    <div className="question-actions">
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() => startEditQuestion(index)}
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => removeQuestion(index)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <button type="submit">Cập nhật Lesson</button>
      </form>
    </div>
  );
};

export default EditLesson;