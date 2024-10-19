// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Create this CSS file for styling
import CourseCard from '../CourseCard/CourseCard';

function Home() {
  return (
    <div>
      <h1>Welcome to the Degree Audit Parser</h1>
      <div className="button-container">
        <Link to="/degree-audit">
          <button>Degree Audit</button>
        </Link>
        <Link to="/section/1">
          <button>Section 1</button>
        </Link>
        <Link to="/section/2">
          <button>Section 2</button>
        </Link>
      </div>

      {/* CourseCard Section */}
      <CourseCard course={{ title: 'Introduction to Programming', credits: 3, completed: false }} />
    </div>
  );
}

export default Home;