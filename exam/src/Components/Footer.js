import React from 'react';
import { Link } from 'react-router-dom';
import "./CSS/Footer.css"

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2023 LPU</p>
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
