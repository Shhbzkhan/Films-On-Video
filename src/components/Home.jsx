// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // optional for hero styling


const Home = () => {
  return (
    <div className="home-container">
      {/* A large hero/banner section */}
      
      <div className="hero-section">
        <div className="hero-overlay">
          <h1>Movies, Games, and More</h1>
          <p>Welcome to OnVideo, your one-stop shop for all entertainment!</p>
        </div>
      </div>

      <div className="home-sections">
        <div className="home-box">
          <h2>New Arrivals</h2>
          <p>Check out the latest additions to our collection...</p>
          <Link to="/new-arrivals" className="btn-link">See More</Link>
        </div>
        <div className="home-box">
          <h2>Staff Picks</h2>
          <p>Our employees’ top recommendations this month...</p>
          <Link to="/staff-picks" className="btn-link">See More</Link>
        </div>
        <div className="home-box">
          <h2>Coming Soon</h2>
          <p>Upcoming releases you won’t want to miss!</p>
          <Link to="/coming-soon" className="btn-link">See More</Link>
        </div>
      </div>

      
      {/* Additional Introduction / About Section */}
      <div className="intro-section1">
        {/* Image on one side */}
        <div>
        <img
          src="/images/oppenheimer.jpg" // Place an appropriate image in public/images/intro.jpg
          alt="Introduction"
          className="intro-image1"
        />

        </div>
        
        {/* Text on the other side */}
        <div className="intro-text1">
        <h2>About Films-On-Video</h2>
          <p>
            OnVideo is dedicated to bringing you the best in movies, adult movies,
            and more. We source the latest releases and timeless classics, ensuring
            there's something for everyone in our extensive library.
          </p>
          <p>
            If you're a film enthusiast, our mission is to
            provide top-quality entertainment at your fingertips. Explore our new
            arrivals, check out staff picks, or dive into our upcoming releases to
            plan your next watch or play session!
          </p>   
          <Link to="/about" className="detail-button">
          Read More
        </Link>        
        </div>
      </div> 


      {/* Additional Introduction / About Section */}
      <div className="intro-section1">
        {/* Image on one side */}
        <div>
        <img
          src="/images/Poster.jpg" // Place an appropriate image in public/images/intro.jpg
          alt="Introduction"
          className="intro-image1"
        />

        </div>
        
        {/* Text on the other side */}
        <div className="intro-text1">
          <h3><i>Collect</i></h3>
          <h1>Entertainment Memorablia</h1>
          <p>
            OnVideo has all sorts of memorablia for your collecting pleasure!
            We have posters, VHS tapes, Special edition board games, action figures, chibis, and more!
          </p>            
        </div>
      </div>


      {/* Additional Introduction / About Section */}
      <div className="intro-section1">
        {/* Image on one side */}
        <div>
        <img
          src="/images/moviePoster.jpg" // Place an appropriate image in public/images/intro.jpg
          alt="Introduction"
          className="intro-image1"
        />

        </div>
        
        {/* Text on the other side */}
        <div className="intro-text1">
          <h3><i>Collect</i></h3>
          <h1>Entertainment Memorablia</h1>
          <p>
            OnVideo has all sorts of memorablia for your collecting pleasure!
            We have posters, VHS tapes, Special edition board games, action figures, chibis, and more!
          </p>            
        </div>
      </div>
           
    </div>
  );
};

export default Home;

