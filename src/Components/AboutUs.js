import React from "react";
import "./AboutUs.css";
import aboutImage from "../assets/about-us-image.jpg"; // Đảm bảo đường dẫn này đúng

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="headline-cell">
        <div className="headline">
          <h2>
            Our Dream is{" "}
            <span className="highlight">Global Learning Transformation</span>
          </h2>
        </div>
      </div>

      <div className="image-cell">
        <img src={aboutImage} alt="About Us" />
      </div>

      <div className="content-cell">
        <div className="content">
          <p>
            Kawruh was founded by Robert Anderson, a passionate lifelong
            learner, and Maria Sanchez, a visionary educator. Their shared dream
            was to create a digital haven of knowledge accessible to all. United
            by their belief in the transformational power of education, they
            embarked on a journey to build 'Kawruh.' With relentless dedication,
            they gathered a team of experts and launched this innovative
            platform, creating a global community of eager learners, all
            connected by the desire to explore, learn, and grow.
          </p>
        </div>
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