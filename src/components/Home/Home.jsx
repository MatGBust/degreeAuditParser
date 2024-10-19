// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Create this CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Homepage</h1>
      <div className="box-container">
        <Link to="/section1" className="box">
          <h2 className="box-title">Section 1</h2>
        </Link>
        <Link to="/section2" className="box">
          <h2 className="box-title">Section 2</h2>
        </Link>
        <Link to="/section3" className="box">
          <h2 className="box-title">Section 3</h2>
        </Link>
      </div>
    </div>
  );
};

export default Home;