// src/components/Home/Home.jsx
import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import './Home.css';

const Home = () => {
  const courses = [
    { id: 1, title: ' COMPUTER SCIENCE & ENGINEERING - MAJOR CORE - PART 1', credits: 3, completed: true },
    { id: 2, title: 'Data Structures', credits: 4, completed: false },
    // Add more courses as needed
  ];

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Process the file (you can send it to a server or read it locally)
      console.log('Uploaded file:', file);
    }
  };

  return (
    <div className="course-cards-container">
      <h1>Hi Buckeye! Upload your degree audit here!</h1>
      <div className="upload-container">
        <label className="upload-button">
          Upload
          <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
        </label>
      </div>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
      
      
    </div>
  );
};

export default Home;