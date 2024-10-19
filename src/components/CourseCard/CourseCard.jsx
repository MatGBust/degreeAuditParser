import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function CourseCard({ course }) {
  return (
    <Link to={`/course/${course.title}`} className="course-card-link">
      <div className="course-card">
        <h3>{course.title}</h3>
        <p>Credits: {course.credits}</p>
        <p>Status: {course.completed ? 'Completed' : 'In Progress'}</p>
      </div>
    </Link>
  );
}

export default CourseCard;