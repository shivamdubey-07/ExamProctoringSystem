import axios from 'axios'
import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';



import "../CSS/studentResult.css"



function StudentResult() {

  const [paperCode, setPaperCode] = useState('');
  const navigate = useNavigate();


  const [results, setResults] = useState([]);
  const [savedResults, setSavedResults] = useState([]);
  
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const handleSearch = () => {
    if (!searchEmail) {
      alert('Please enter an email to search');
      return;
    }

    const filteredResults = results.filter((result) => result.email === searchEmail);
    if (filteredResults.length === 0) {
      setError('No results found for the entered email');
    } else {
      setResults(filteredResults);
      setError(null);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchEmail(event.target.value);
  };

  const handleResetResults = () => {

    setResults(savedResults);
    setSearchEmail(''); 
    setError(null);
  };
  const  handleResults =(req,res)=>{


    

    if(!paperCode){
      alert("Please enter a paper code")
      
    }
    axios
      .get(`http://localhost:9000/api/studentsResults/${paperCode}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setResults(response.data); 
        setSavedResults(response.data);
        setError(null); 
      })
      .catch((error) => {
        setResults([]);
        setSavedResults([]);
        setError('Error fetching results');
      });
    
  }
  const handleInputChange = (event) => {
    setPaperCode(event.target.value);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="student-result-container">
    
    <div>
    
    <button  className="m-2 go-back-button" onClick={goBack}>🔙 Back</button>
    </div>


    <input
      type="text"
      placeholder="Enter paper code"
      value={paperCode}
      onChange={handleInputChange}
      className="paper-code-input"
    />
    <button className='btn btn-primary get-results-button' onClick={handleResults}>
      Get Results
    </button>

    {error && <p className="error-message">Error: {error}</p>}

    {results.length > 0 ? (
      <div className="results-container">
        <h2 className="results-heading">Results for Paper Code: {paperCode}</h2>
        <h2>Total Results {results.length}</h2>
        <input
        type="text"
        placeholder="Search by Email"
        value={searchEmail}
        onChange={handleSearchInputChange}
        className="search-email-input"
      />
      <button className=" m-2 btn btn-primary search-button" onClick={handleSearch}>
        Search
      </button>
      <button className="m-2 btn btn-secondary" onClick={handleResetResults}>
        Reset search
      </button>
        
        <ul className="results-list">
          
{results.map((result, index) => (
  <li key={index} className="result-item">
    <div className="result-item-box">
      <div className="result-item-box-content">
        <p className="result-item-label">Email</p>
        <p>{result.email}</p>
      </div>
      <div className="result-item-box-content">
        <p className="result-item-label">Total Questions</p>
        <p>{result.totalQuestions}</p>
       
      </div>
      <div className="result-item-box-content">
        <p className="result-item-label">Unanswered Questions</p>
        <p>{result.totalQuestions - result.correctAnswers - result.wrongAnswers}</p>
      </div>
      <div className="result-item-box-content">
        <p className="result-item-label">Correct Answers</p>
        <p>{result.correctAnswers}</p>
      </div>
      <div className="result-item-box-content">
        <p className="result-item-label">Wrong Answers</p>
        <p>{result.wrongAnswers}</p>
      </div>
    </div>
  </li>
))}
        </ul>
      </div>
    ) : null}
  </div>
  )
}

export default StudentResult