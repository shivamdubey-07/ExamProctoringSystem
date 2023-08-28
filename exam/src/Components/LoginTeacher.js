import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { setUser } from "../Features/Slices/userSlice";
import { useDispatch } from "react-redux";





function LoginTeacher() {

  const navigate = useNavigate();
  const dispatch =useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
          email:formData.email,
          password: formData.password,}),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("login successfuly",data);
        dispatch(setUser(data)); 
    
        navigate("/admin-dashboard");
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }




    console.log("Sign in with:", formData.email, formData.password);
  };

  return (
    <div className="login_page">
      <div className="container-reg">
        <div className="container-form">
        
            <h2>Sign In</h2>
            <p>As an Examiner/Instiution</p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Sign In
              </button>
            </form>
      
        </div>
      </div>
    </div>
  );
}

export default LoginTeacher;
