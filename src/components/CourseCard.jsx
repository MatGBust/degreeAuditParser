// src/components/CourseCard.js
import React from 'react';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <div className={`course-card ${course.completed ? 'completed' : ''}`}>
      <h3>{course.title}</h3>
      <p>{course.credits} Credits</p>
      <p>Status: {course.completed ? 'Completed' : 'In Progress'}</p>
    </div>
  );
};

export default CourseCard;