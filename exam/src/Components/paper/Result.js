import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import {Cookies} from 'react-cookie';
import { useSelector } from 'react-redux';

import "../CSS/result.css"


function ExamScores() {
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const userData = useSelector((state) => state.userData.userData)

  useEffect(() => {
   
    console.log("hello")
   

    fetch("http://localhost:9000/api/result",{
        method: 'GET',
        headers: {
            Accept: 'application/json',
          'Content-Type': 'application/json',
       
        },
        credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Scores not found');
        }
    
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setScores(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!scores || scores.length === 0) {
    return <div>No scores available for this user.</div>;
  }

  return (
    <div className="result-cards">
    <div className="card">
      <h2>Total Questions</h2>
      <p>{scores.totalQuestions}</p>
    </div>
    <div className="card">
      <h2>Correct Questions</h2>
      <p>{scores.correctAnswers}</p>
    </div>
    <div className="card">
      <h2>Wrong Questions</h2>
      <p>{scores.wrongAnswers}</p>
    </div>
    <div className="card">
      <h2>Percentage</h2>
      <p>{(scores.correctAnswers/scores.totalQuestions)*100}%</p>
    </div>
  </div>
  
  );
}

export default ExamScores;
