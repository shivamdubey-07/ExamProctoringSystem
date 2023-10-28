import React from "react";
import Dashboard from "./Components/Dashboard";

import RegisterTeacher from "./Components/RegisterTeacher";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginTeacher from "./Components/LoginTeacher";
import StudentLogin from "./Components/StudentLogin"
import Aboutus from "./Components/Aboutus";
import AdminDashboard from "./Components/AdminDashboard";
import Exam from "./Components/paper/Exam";
import Result from "./Components/paper/Result";
import Check from "../src/Components/paper/Check"

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
        <Route exact path="/exam" element={<Exam />}></Route>
        <Route exact path="/result" element={<Result />}></Route>
        <Route exact path="/c" element={<Check />}></Route>
     
        <Route
          exact
          path="/admin-dashboard"
          element={<AdminDashboard />}
        ></Route>
      </Routes>
    </BrowserRouter>
    //  <div>
    //  <Nav/>
    //  <Dashboard/>

    //  hello shivam</div>
  );
}

export default App;
