import React from "react";
import Dashboard from "./Components/Dashboard";

import RegisterTeacher from "./Components/RegisterTeacher";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginTeacher from "./Components/LoginTeacher";
import StudentLogin from "./Components/StudentLogin";
import Aboutus from "./Components/Aboutus";
import Contact from "./Components/Contact";
import AdminDashboard from "./Components/AdminDashboard";
import Result from "./Components/paper/Result";
import QuestionPaper from "./Components/student/QuestionPaper";
import StudentDashboard from "./Components/student/StudentDashboard";
import StudentResult from "./Components/student/StudentResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route
          exact
          path="/signup-teachers"
          element={<RegisterTeacher />}
        ></Route>
        <Route exact path="/login-teachers" element={<LoginTeacher />}></Route>
        <Route exact path="/login-students" element={<StudentLogin />}></Route>
        <Route exact path="/about" element={<Aboutus />}></Route>
        <Route exact path="/results" element={<Result />}></Route>
        <Route exact path="/paper" element={<QuestionPaper />}></Route>
        <Route exact path="/studentsResult" element={<StudentResult />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route
          exact
          path="/studentDashboard"
          element={<StudentDashboard />}
        ></Route>

        <Route
          exact
          path="/admin-dashboard"
          element={<AdminDashboard />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
