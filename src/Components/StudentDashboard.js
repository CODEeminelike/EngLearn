import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import LessonList from "./LessonList";
import LearnLesson from "./LearnLesson";
import SubmissionHistory from "./SubmissionHistory";
import SubmissionDetail from "./SubmissionDetail";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <br></br>
      <br></br>
      <br></br>
      <h2>Student Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/student-dashboard/lessons">Học</Link>
          </li>
          <li>
            <Link to="/student-dashboard/submission-history">Lịch sử làm bài</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="lessons" element={<LessonList />} />
        <Route path="learn-lesson/:lessonId" element={<LearnLesson />} />
        <Route path="submission-history" element={<SubmissionHistory />} />
        <Route path="submission-detail/:submissionId" element={<SubmissionDetail />} />
      </Routes>
    </div>
  );
};

export default StudentDashboard;