import React from 'react';




const QuestionNavigation = ({ questions, currentQuestion, onQuestionSelect }) => {
  return (
    <div className="question-navigation">
      <h2>Questions</h2>
      <ul>
        {questions.map((question, index) => (
          <li
            key={index}
            onClick={() => onQuestionSelect(index)}
            className={currentQuestion === index ? 'active' : ''}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionNavigation;
