// src/components/CourseCard/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  // Calculate progress percentage
  const progress = course.completed ? 100 : 0; // Example: 100% if completed, 0% if not

  return (
    <Link to={`/course/${course.id}`} className="course-card">
      <div className="course-card-content">
        <h2>{course.title}</h2>
        <p>Credits: {course.credits}</p>
        
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <p>{course.completed ? 'Completed' : 'Not Completed'}</p>
      </div>
    </Link>
  );
};

export default CourseCard;