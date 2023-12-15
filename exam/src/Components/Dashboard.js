import React from "react";
import { Link } from "react-router-dom";
import img from "../utility/img.jpg";
import Aboutus from "./Aboutus";
import Typewriter from "typewriter-effect";
import Nav from "./Nav";
import Contact from "./Contact";
import Footer from "./Footer";

require("../Components/CSS/dashboard.css");

function Dashboard() {
  

  return (
    <div className="landing-page">
      <Nav />

      <div className="image-container">
        <img className="landing_img" src={img} alt="Landing img" />

        <div className="text-overlay">
          <h2>Welcome to Our Examination Portal</h2>

          <Typewriter
            onInit={(typewriter) => {
              typewriter

                .typeString("Discover the new World of conducting online exam")
                .start();
            }}
          />
        </div>

        <div className="button-container">
          <Link className="login-button-students" to="/login-students">
            Login For Students
          </Link>
          <Link className="login-button-teacher" to="/signup-teachers">
            Signup For Teachers
          </Link>

          <Link className="login-button-students" to="/login-teachers">
            Login For teachers
          </Link>
        </div>
      </div>

      <Aboutus />
      <Contact />
      <Footer />
    </div>
  );
}

export default Dashboard;
