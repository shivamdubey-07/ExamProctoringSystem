import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import "../CSS/question.css"
import "../CSS/question-navigation.css"

const Exam = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:9000/api/questions',{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"

      },
      credentials:"include"
    })
      .then((response) => {
        if (!response.ok) {
           
      navigate("/login-teachers ")
          throw new Error('Network response was not ok');

        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error('Error fetching questions', error);
      });
  }, []);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswer = (selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: selectedOption,
    }));
  };
  const calculateScore = async () => {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    const totalQuestions = questions.length; // Get the total number of questions
    let unAnsQue=0;
  
    for (const questionIndex in userAnswers) {
      if (userAnswers[questionIndex] === questions[questionIndex].correctAnswer) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    }
    unAnsQue=totalQuestions-(correctAnswers+wrongAnswers);
  
    console.log(`Total Questions: ${totalQuestions}`);
    console.log(`Correct Answers: ${correctAnswers}`);
    console.log(`Wrong Answers: ${wrongAnswers}`);
    console.log(`unaswered question: ${unAnsQue}`);

    try {
     
   
      await fetch('http://localhost:9000/api/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
       
        },
        credentials: 'include',
        body: JSON.stringify({
        
          correctAnswers,
          wrongAnswers,
          totalQuestions,
        }),
      });

      
      navigate("/result ")
    } catch (error) {
      console.error('Error saving scores', error);
    }
  };
  
  

  return (
    <div className="exam-container">
      <div className="question-navigation">
        <h2>Questions</h2>
        <ul>
          {questions.map((question, index) => (
            <li
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={currentQuestion === index ? 'active' : ''}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
      {questions.length > 0 && (
        <div className="question-container">
          <h2 className="question">Question {currentQuestion + 1}</h2>
          <p>{questions[currentQuestion].text}</p>
          <ul className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <li className="option" key={index}>
                <label>
                  <input  type="radio"
                  name={`question${currentQuestion}_options`} // Use a unique name for each question
                  value={option}
                  checked={userAnswers[currentQuestion] === option}
                  onChange={() => handleAnswer(option)} />
                  {option}
                </label>
              </li>
            ))}
          </ul>
         
            <button className="prev" onClick={handlePrev} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button className="next" onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
              Next
            </button>
            <button onClick={calculateScore}>Finish</button>
        </div>
      )}
    </div>
  );
};

export default Exam;
