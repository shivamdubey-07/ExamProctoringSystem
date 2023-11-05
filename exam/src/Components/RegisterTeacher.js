import React, {  useState } from "react";
import Typewriter from "typewriter-effect";
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router-dom";

require("../Components/CSS/loginteacher.css");

function RegisterTeacher() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false);
const navigate=useNavigate();
  const fetchingData = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:9000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });
    const data = await response.json();
  
    if (response.ok) {
  
      console.log("User registered successfully", data);
      setLoading(false);
      navigate("/login-teachers");
    } else if (response.status === 400 && data.message === "Email already registered") {
      console.error("Email already registered", data);
      setEmailAlreadyRegistered(true);
    } else {
      console.error("Registration failed", data);
    }
    console.log(data);
    setLoading(false);
  
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setEmailAlreadyRegistered(false);
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      
      setLoading(false);
      return; 
    }

    setPasswordsMatch(true);

    console.log(formData);

    fetchingData();
    
    

    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div>
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
                <div className="error-message">! Passwords do not match</div>
              )}

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                  }}
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
                {emailAlreadyRegistered && (
                  <div className="error-message">Email is already registered.</div>
                )}
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
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                  data-toggle="popover"
                  data-trigger="focus"
                  data-content="Password must be strong"
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
                  data-toggle="popover"
                  data-trigger="focus"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
            </form>
           
            <div className="progressBar">

            {loading ? <CircularProgress size={50}  color="success" />:""}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterTeacher;
