import React from 'react';
import Header from './components/Header'; // Make sure the path is correct
import DegreeAuditParser from './components/DegreeAuditParser.jsx'; // Ensure it's the correct path
import './App.css'; // Import your global styles
import ProgressBar from './components/ProgressBar.jsx';
import CourseCard from './components/CourseCard.jsx';

function App() {
  return (
    <>
      <Header /> {/* Header Component */}
      <div className="main-content">
        <DegreeAuditParser /> {/* Main Degree Audit Parser Content */}
        <ProgressBar />
        <CourseCard course={{ title: 'Introduction to Programming', credits: 3, completed: false }} />
      </div>
    </>
  );
}

export default App;