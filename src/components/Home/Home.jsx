// src/components/Home/Home.jsx
import React from 'react';
import CourseCard from '../CourseCard/CourseCard'; // Adjust the path as needed

const Home = () => {
  const courses = [
    { id: 1, title: 'COMPUTER SCIENCE & ENGINEERING - MAJOR CORE - PART 1', credits: 3, completed: true },
    { id: 2, title: 'COMPUTER SCIENCE & ENG - TECH//DIRECT//TARGETED ELECTIVES SOFTWARE ENGINEERING OPTION', credits: 4, completed: false },
    // Add more courses as needed
  ];

  return (
    <div>
      <h1>Available Courses</h1>
      <div className="course-cards-container">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Home;