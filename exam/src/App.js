import React from "react";
import Dashboard from "./Components/Dashboard";

import RegisterTeacher from "./Components/RegisterTeacher";
import Nav from "./Components/Nav";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginTeacher from "./Components/LoginTeacher";
import StudentLogin from "./Components/StudentLogin";
import Aboutus from "./Components/Aboutus";
import AdminDashboard from "./Components/AdminDashboard";

function App() {
  return (
      
    <BrowserRouter>
    <Nav/>
      <Routes>
      <Route exact path='/' element={< Dashboard />}></Route>  
      <Route exact path='/signup-teachers' element={< RegisterTeacher />}></Route>  
      <Route exact path='/login-teachers' element={<LoginTeacher/>}></Route>  
      <Route exact path='/login-students' element={<StudentLogin/>}></Route>  
      <Route exact path='/about' element={<Aboutus/>}></Route>  
      <Route exact path='/admin-dashboard' element={<AdminDashboard/>}></Route>  

   
        
      </Routes>
    </BrowserRouter>
  //  <div>
  //  <Nav/>
  //  <Dashboard/>
   
  //  hello shivam</div>
  )
}

export default App;
