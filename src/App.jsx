import React from 'react';
import Header from './components/Header/Header.jsx'; // Make sure the path is correct
import DegreeAuditParser from './components/DegreeAuditParser/DegreeAuditParser.jsx'; // Ensure it's the correct path
import './App.css'; // Import your global styles
import SectionPage from './components/SectionPage/SectionPage.jsx';
import Home from './components/Home/Home.jsx';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/section1" element={<SectionPage />} />
      <Route path="/section2" element={<SectionPage />} />
      <Route path="/section3" element={<SectionPage />} />
    </Routes>
  </Router>
  );
}

export default App;
/*OLDVERSION
import React from 'react';
import Header from './components/Header/Header.jsx'; // Make sure the path is correct
import DegreeAuditParser from './components/DegreeAuditParser/DegreeAuditParser.jsx'; // Ensure it's the correct path
import './App.css'; // Import your global styles
import ProgressBar from './components/SectionPage/SectionPage.jsx';
import CourseCard from './components/Home/Home.jsx';

function App() {
  return (
    <>
      <Header /> 
      <div className="main-content">
        <DegreeAuditParser /> {/* Main Degree Audit Parser Content *//*}
        <ProgressBar />
        <CourseCard course={{ title: 'Introduction to Programming', credits: 3, completed: false }} />
      </div>
    </>
  );
}

export default App;
*/