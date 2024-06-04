import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    code: "",
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

    try{
      const response = await fetch("https://exam-backend-0p6v.onrender.com/api/studentLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          code: formData.code,
        }),
      });

      
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        
        navigate("/studentDashboard")
        console.log("the data of user is", data);
        
      

      } else {
       

        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }


  }

  return (
    <div>
      <div className="login_page">
        <div className="container-reg">
          <div className="container-form">
            <h1 class="mb-5">Student Details</h1>

            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              

              <div class="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  aria-describedby="emailHelp"
                />
              </div>

              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Paper Code
                  <span
                    style={{
                      fontSize: "10px",
                      marginLeft: "2px",
                      display: "block",
                    }}
                  >
                    *Assigned By Organization
                  </span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                />
              </div>

            
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
