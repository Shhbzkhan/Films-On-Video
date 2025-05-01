import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <Link to="/contact" className="footer-contact">
            Contact Us
          </Link>
        </div>
        <div className="footer-center">
          <p><b>Store Location</b>: 1922 Park Springs Blvd, Arlington, TX</p>
        </div>
        <div className="footer-right">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="social-icon" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
