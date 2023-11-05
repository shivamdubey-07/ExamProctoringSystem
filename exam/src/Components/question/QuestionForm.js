import React, { useState } from "react";
import "./form.css"
const QuestionForm = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSave = () => {
    const newQuestion = {
      text,
      options,
      correctAnswer,
    };
    onSubmit(newQuestion);
    setText("");
    setOptions(["", ""]);
    setCorrectAnswer(null);
  };

  return (
    <div className="question-form-container">
    <h4>Question</h4>
    <input
      className="question-text-input"
      type="text"
      placeholder="Question Text"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    {options.map((option, index) => (
      <div key={index}>
      Option {index+1}  <input
          className="option-input"
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      </div>
    ))}
    <button className="add-option-button" onClick={addOption}>
      Add Option
    </button>
    <select
      className="correct-answer-select"
      value={correctAnswer}
      onChange={(e) => setCorrectAnswer(e.target.value)}
    >
      <option value={null}>Select Correct Option</option>
      {options.map((option, index) => (
        <option key={index} value={index}>
          Option {index + 1}
        </option>
      ))}
    </select>
    <button className="add-question-button" onClick={handleSave}>
      Add Question
    </button>
  </div>
  );
};

export default QuestionForm;
  