import React from 'react';
import "../CSS/result.css"
import { useEffect ,useState} from 'react';

const ResultsPage = () => {

  const [results, setResults] = useState([]);
  const [per, setPer] = useState();

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch('http://localhost:9000/api/result', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const calculatedResults = await response.json();
          setResults(calculatedResults);
        } else {
          console.error('Failed to retrieve calculated results');
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    }
    

    fetchResults();

    const percentage=(results.correctAnswers/results.totalQuestions)*100; 
    const per = percentage.toFixed(2);
    console.log(results)
    console.log(percentage)
    setPer(per)
  }, );

  return (
    <div className='result-cards'>
      <h2>Results</h2>
    
      <div className='card'>Total Questions: {results.totalQuestions}</div>
      <div className='card'>Total Right: {results.correctAnswers}</div>
      <div className='card'>Total Wrong: {results.wrongAnswers}</div>
      <div className='card'>Percentage: {per}%</div>
     
     
    </div>
  );
};

export default ResultsPage;
