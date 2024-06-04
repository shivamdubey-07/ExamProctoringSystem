import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCounts } from "../../Features/Slices/resultSlice";

import "./questionList.css";

function QuestionPaper() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [timer, setTimer] = useState(3*60*60);
  const [isTimerOver, setIsTimerOver] = useState(false);
  useEffect(() => {
    // Disable right-clicking
    document.addEventListener('contextmenu', handleContextMenu);

    // Disable copying and pasting
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('paste', handlePaste);

    // Additional step to prevent dragging and dropping if needed
    document.addEventListener('dragstart', handleDragStart);

    // Cleanup listeners on component unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);


  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleCopy = (e) => {
    e.preventDefault();
  };

  const handleCut = (e) => {
    e.preventDefault();
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };



  const [counts, setCounts] = useState({
    totalQuestions: 0,
    totalRight: 0,
    totalWrong: 0,
    percentage: 0,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();




  useEffect(() => {
    axios
      .get("https://exam-backend-0p6v.onrender.com/api/showquestion", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        const initialUserAnswers = {};
        response.data.forEach((question) => {
          initialUserAnswers[question._id] = null;
        });
        setUserAnswers(initialUserAnswers);
        setQuestions(response.data);
        setCounts((prevCounts) => ({
          ...prevCounts,
          totalQuestions: response.data.length,
        }));
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });

    



      
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    // Check if the timer has reached zero
    if (timer === 0) {
      setIsTimerOver(true);
     checkAnswers()
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    

    console.log(questionId, optionIndex);
    console.log("questionId", questionId);
    console.log("optionIndex", optionIndex);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
    console.log("useranswer", userAnswers);
  };

  const checkAnswers = async () => {
    const newResults = [];
    let totalRight = 0;
    let totalWrong = 0;
    let totalQuestions = 0;
    let code = 0;

    questions.forEach((quest, index) => {
      totalQuestions = quest.question.length;
      console.log("total question is", totalQuestions);
      console.log("cod is dfks", quest.code);
      code = quest.code;

      quest.question.forEach((q, i) => {
        const userAnswer = userAnswers[q._id];

        if (userAnswer == null) {
          console.log("null");
        } else {
          const correctAnswer = q.correctAnswer;
          const isCorrect = userAnswer == correctAnswer;

          if (isCorrect) {
            totalRight++;
          } else {
            totalWrong++;
          }

          newResults.push({
            questionNumber: index + 1,
            isCorrect,
          });
        }
      });
    });

    const percentage = (totalRight / questions.length) * 100;
    console.log("code is", code);

  

    try {
      await fetch("https://exam-backend-0p6v.onrender.com/api/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          code,
          totalRight,
          totalWrong,
          totalQuestions,
        }),
      });
    } catch (error) {
      console.error("Error saving scores", error);
    }

    const updatedCounts = {
      totalQuestions: questions.length,
      totalRight,
      totalWrong,
      percentage,
    };

    dispatch(updateCounts(updatedCounts));

    navigate("/results", {
      state: {
        results: newResults,
        counts,
      },
    });
  };

 

  return (
    <div className="question-list">
      <h2>Exam Questions</h2>
      <div className={`timer-container ${isTimerOver ? 'timer-over' : ''}`}>
      {isTimerOver ? (
        <p>Submitting The Exam.</p>
      ) : (
        <p>Time remaining: {formatTime(timer)}</p>
      )}
    </div>
      {questions.map((quest, index) => (
        <div key={quest._id} className="question">
          {quest.question.map((q, i) => (
            <div key={i + 1} className="question-inside">
              <p className="text">
                Question{i + 1}- {q.text}
              </p>
              {q.options.map((option, optIndex) => (
                <div key={optIndex} className="option">
                  <div className="div_option">
                 
                    <input
                      type={option.multipleChoice ? "checkbox" : "radio"}
                      name={`question_${q._id}_${optIndex}`}
                      value={optIndex}
                      checked={userAnswers[q._id] === optIndex}
                      onChange={() => handleOptionSelect(q._id, optIndex)}
                    />

                    <p>{option}</p> 
                    <br />

                    <br />

                    <br />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button onClick={checkAnswers}>Submit</button><span style={{ fontSize:"10px" }}>*Do not submit before compeletion</span>
    </div>
  );
}

export default QuestionPaper;
