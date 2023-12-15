import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";


function StudentDashboard() {
  const navigate = useNavigate();
 


  const handleStartExamClick = () => {
   

    setTimeout(() => {
    navigate("/paper")},1000)
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", }}>
    <button style={{
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    }} onClick={handleStartExamClick}>Start Exam</button>
  </div>
  );
}

export default StudentDashboard;
