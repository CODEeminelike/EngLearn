// src/Components/AboutUs.js
import React from "react";
import "./AboutUs.css";
import aboutImage from "../assets/about-us-image.jpg"; // Đảm bảo đường dẫn này đúng

const AboutUs = () => {
  // ... (code hiện tại của bạn trong useInView, nếu có)

  return (
    <section 
      id="about-us-section" // << THÊM ID VÀO ĐÂY
      className="about-us"
      // ref={sectionRef} // Nếu bạn có ref từ useInView cho animation, giữ nguyên
    >
      {/* Toàn bộ nội dung hiện tại của component AboutUs */}
      <div
        // ref={headlineRef} // ví dụ ref cho animation
        className={`headline-cell cell-animation ${
          // headlineIsVisible ? "is-visible" : "" // ví dụ class cho animation
          "" // Bỏ trống nếu không có animation hoặc giữ nguyên logic animation của bạn
        }`}
      >
        <div className="headline">
          <h2>
            Our Dream is{" "}
            <span className="highlight">Global Learning Transformation</span>
          </h2>
        </div>
      </div>

      {/* Các ô khác tương tự */}
      <div 
        // ref={imageRef}
        className={`image-cell cell-animation ${
          // imageIsVisible ? "is-visible" : ""
          ""
        }`}
      >
        <img src={aboutImage} alt="About Us" />
      </div>

      <div 
        // ref={contentRef}
        className={`content-cell cell-animation ${
          // contentIsVisible ? "is-visible" : ""
          ""
        }`}
      >
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

      <div 
        // ref={statsRef}
        className={`stats-cell cell-animation ${
          // statsAreVisible ? "is-visible" : ""
          ""
        }`}
      >
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