// src/Components/AboutUs.js
import React from "react";
import "./AboutUs.css";
import aboutImage from "../assets/about-us-image.jpg";

const AboutUs = () => {
  return (
    <section id="about-us-section" className="about-us">
      {/* Toàn bộ nội dung trong AboutUs */}
      <div className="headline">
        <h2>
          Our Dream is{" "}
          <span className="highlight">Global Learning Transformation</span>
        </h2>
      </div>
      <div className="image-cell">
        <img src={aboutImage} alt="About Us" />
      </div>
      <div className="content-cell">
        <p>
          Kawruh was founded by Robert Anderson, a passionate lifelong learner,
          and Maria Sanchez, a visionary educator. Their shared dream was to
          create a digital haven of knowledge accessible to all...
        </p>
      </div>
      <div className="stats-cell">
        <div className="stats">
          <div className="stat">
            <h3>3.5</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat">
            <h3>23</h3>
            <p>Project Challenge</p>
          </div>
          <div className="stat">
            <h3>830+</h3>
            <p>Positive Reviews</p>
          </div>
          <div className="stat">
            <h3>100K</h3>
            <p>Trusted Students</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
