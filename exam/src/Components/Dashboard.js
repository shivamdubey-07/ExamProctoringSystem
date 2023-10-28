import React from 'react'
import RegisterTeacher from "./RegisterTeacher"
import { Link } from 'react-router-dom'
import landingImage from "../utility/landing-mg.jpg"
import Aboutus from './Aboutus'
import Typewriter from "typewriter-effect"



require("../Components/CSS/dashboard.css")

function Dashboard() {


    const handleClick=()=>{
        
       <RegisterTeacher/>
    }


  return (
    <div className="landing-page">

    <div className='image-container'>
      <img  className='landing_img' src={landingImage} alt="Landing img"/>

      <div className="text-overlay">


      
      <h2>Welcome to Our Website</h2>

      <Typewriter
 
      onInit={(typewriter) => {
          typewriter
              
              .typeString("Discover the new World of conducting online exam")
              .start();
      }}
  />
      </div>

      <div  className="button-container">
      <Link className='login-button-teacher' to='/signup-teachers'>Signup For Teachers</Link>
      <Link  className='login-button-students' to='/login-students'>Login For Students</Link>
      <Link  className='login-button-students' to='/login-teachers'>Login  For teachers</Link>

      </div>
      </div>


      <Aboutus/>
      
    
    
    
    
    
    
    
    
    
   
    
    </div>
  )
}

export default Dashboard