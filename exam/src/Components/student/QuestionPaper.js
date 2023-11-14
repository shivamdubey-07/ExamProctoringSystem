import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCounts } from "../../Features/Slices/resultSlice";

import "./questionList.css";

function QuestionPaper() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});


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
      .get("http://localhost:9000/api/showquestion", {
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
      await fetch("http://localhost:9000/api/result", {
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

  // document.addEventListener('copy', (event) => {
  //   event.preventDefault();
  // });
  
  // document.addEventListener('cut', (event) => {
  //   event.preventDefault();
  // });
  
  // document.addEventListener('paste', (event) => {
  //   event.preventDefault();
  // });

  // window.addEventListener('keydown', (event) => {
  //   if (event.ctrlKey && (event.key === 'n' || event.key === 't' || event.key === 'r')) {
  //     event.preventDefault();
  //   }
  // });

  // window.addEventListener('contextmenu', (event) => {
  //   event.preventDefault();
  // });

  // window.addEventListener('beforeunload', (event) => {
  //   event.preventDefault();
  //   event.returnValue = 'Are you sure you want to leave the exam?';
  // });

  return (
    <div className="question-list">
      <h2>Exam Questions</h2>
      {questions.map((quest, index) => (
        <div key={quest._id} className="question">
          {quest.question.map((q, i) => (
            <div key={i + 1} className="question-inside">
              <p className="text">
                Question{i + 1}- {q.text}
              </p>
              {q.options.map((option, optIndex) => (
                <div key={optIndex} className="option">
                  <div>
                 
                    <input
                      type={option.multipleChoice ? "checkbox" : "radio"}
                      name={`question_${q._id}_${optIndex}`}
                      value={optIndex}
                      checked={userAnswers[q._id] === optIndex}
                      onChange={() => handleOptionSelect(q._id, optIndex)}
                    />

                    {option}
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
      <button onClick={checkAnswers}>Check Answers</button>
    </div>
  );
}

export default QuestionPaper;
