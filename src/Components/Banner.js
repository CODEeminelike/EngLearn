// src/Components/Banner.js
import React from "react";
import "./Banner.css";
import bannerImage from "../assets/banner-image.jpg"; // Thêm hình ảnh của bạn vào thư mục assets

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h2>Create <span className="highlight">New Experience</span> With Ways Of <span className="highlight">Perfect Learning</span>.</h2>
        <p>
          At Study Buddy, we understand that every student is unique and so are their learning needs. Our mission is to match students with experienced and caring home tutors who will provide personalized support, inspire confidence and ignite a passion for learning.
        </p>
        <div className="banner-buttons">
          <button className="get-started">Get Started</button>
          <button className="explore-courses">Explore Courses</button>
        </div>
      </div>
      <div className="banner-image">
        <img src={bannerImage} alt="Banner" />
      </div>
    </section>
  );
};

export default Banner;
