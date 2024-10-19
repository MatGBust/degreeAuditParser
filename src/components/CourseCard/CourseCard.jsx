// src/components/CourseCard/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css'; // Import your CSS file

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`} className="course-card">
      <div className="course-card-content">
        <h2>{course.title}</h2>
        <p>Credits: {course.credits}</p>
        <p>{course.completed ? 'Completed' : 'Not Completed'}</p>
      </div>
    </Link>
  );
};
export default CourseCard; // Ensure this line is present
