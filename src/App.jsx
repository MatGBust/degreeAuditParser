import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'; // Home component displaying course cards
import CourseDetails from './components/CourseDetails/CourseDetails'; // Component for displaying course details
import Header from './components/Header/Header'; // Home component displaying course cards
import './App.css'; // Global styles, if any
import BackButton from './components/BackButton/BackButton'; 
import { fetchData } from './util/api';

function App() {
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const getClassData = async () => {
      try {
        const data = await fetchData('CSE', '1222'); // Fetch data using the async function
        setClassData(data); // Set the returned data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getClassData(); // Call the async function
  }, []); // Empty dependency array to run once

  console.log(classData?.title)


  return (
    <Router>
      <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Homepage with Course Cards */}
          {/* <Route path="/course/:courseId" element={<CourseDetails />} /> Course details page */}
          {/* Add more routes as needed */}

          {/* Add the BackButton to CourseDetails page */}
          <Route 
            path="/course/:courseId" 
            element={
              <>
                <BackButton /> {/* Back button will only show on the CourseDetails page */}
                <CourseDetails />
              </>
            } 
          />
          
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
