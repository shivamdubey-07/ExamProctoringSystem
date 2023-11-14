import React, { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import axios from "axios";
import { useSelector } from "react-redux";
import "../question/questionMake.css"
import { Button } from "bootstrap";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  


  const myData = useSelector((state) => state.userData);
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/showquestionlist", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("question list in",response.data)


      
      setQuestions(response.data);
    
     
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  useEffect(() => {

    
   

    fetchQuestions();
    console.log("fjffa",questions)
  });

  const handleSaveQuestion = (question) => {
    console.log("handle save ",question)
    {

      console.log("is it being called now");
      const apiUrl = "http://localhost:9000/api/addquestion";


      console.log("is it being called nowq2");
      console.log("mydata in add ",myData)
      console.log("question in add ",question)
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ myData, question }),
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          console.log("is it being called nowq3");
          return response.json();
        })
        .then((data) => {
          console.log(".....................", questions);
          
          setQuestions([...questions, data]);
        })
        .catch((error) => {
          console.error("Fetch error:", error.message);
        });
    }


  };

  const handleNewPaper=async()=>{

    try {
      const response = await axios.delete("http://localhost:9000/api/createnewpaper", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("question list in",response.data)


      
      setQuestions([]);
    
     
    } catch (error) {
      console.error("Error fetching questions:", error);
    }

  
  }


  const handleDeleteQuestion = (question) => {
    console.log("deleting quesiton is",question)
    axios
      .delete(`http://localhost:9000/api/deletequestion/${question._id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(() => {
        const updatedQuestions = questions.map((quest) => ({
          ...quest,
          question: quest.question.filter((q) => q._id !== question._id)
        }));
        setQuestions(updatedQuestions);
     
      });
  };

  return (
    <div className="question-list-container">
     
   

      {questions.map((quest, index) => (
        <div key={index + 1} className="question-item">
        <p>Questions:</p>
        <button className=" btn btn-success btnNewPaper" onClick={handleNewPaper} >Create a new Paper</button>
        <p>Your Paper Code is {quest.code}<span style={{fontSize:"13px"}}>*Share it With Students</span></p>
          {quest.question.map((q, i) => (
            <div key={i + 1} className="question-text">
              <p>Q{i+1} - {q.text}</p>
             
              <button
                className="delete-button"
                onClick={() => handleDeleteQuestion(q)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ))}
      <QuestionForm onSubmit={handleSaveQuestion} />
    </div>
  );
};

export default QuestionList;


