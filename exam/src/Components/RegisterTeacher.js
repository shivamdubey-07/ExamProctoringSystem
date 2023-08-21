import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
require("../Components/CSS/loginteacher.css")


function RegisterTeacher() {
  //state for saving id and password
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true); 
 




  //function for sending data to server
  const fetchingData = async () => {
    const response = await fetch("http://localhost:9000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.name,
        email:formData.email,
        password: formData.password,
        
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  //handeling id input change

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  //Handeling form data submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return; // Do not submit the form
    }
    
    // Passwords match, proceed with submission
    setPasswordsMatch(true);

    console.log(formData);
    

    // calling the fetchingData function for sending data to server after clicking on submit button
    fetchingData();

    // Resetting the input fields after submitting the form
    setFormData({ name: '',
    email: '',
    password: '',
    confirmPassword: '',});
  
  };

  return (
    <div >
    <div className="login_page">
    
    <div className="left-text">
    <Typewriter
 
    onInit={(typewriter) => {
        typewriter
            .typeString("Welcome")
            .pauseFor(1000)
            .deleteAll()
            .typeString("We are here at your service")
            .start();
    }}
/>
    
    </div>

   
    <div className="container-reg">
    


    <div className="container-form">
      <form onSubmit={handleFormSubmit}>
      {!passwordsMatch && (
        <div style={{ color: 'red' }}>Passwords do not match</div>
      )}

      <div className="mb-3">
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
      type="name"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
        aria-describedby="emailHelp"
        className="form-control"
        required
        
      />
    </div>

      
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            Email address
          </label>
          <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
            aria-describedby="emailHelp"
            className="form-control"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
       

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      </div>


    </div>

    </div>

    </div>
  );
}

export default RegisterTeacher;
