import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'; // Home component displaying course cards
import CourseDetails from './components/CourseDetails/CourseDetails'; // Component for displaying course details
import Header from './components/Header/Header'; // Home component displaying course cards
import './App.css'; // Global styles, if any
import { fetchData } from './util/api';

function App() {

  const getClassData = () => {
    fetchData('CSE', '1222')  // Call fetchData, which returns a promise
      .then((data) => {
        console.log(data.title);  // Handle the resolved data here
        return data;  // You can return the value for further use
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  getClassData();

  return (
    <Router>
      <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Homepage with Course Cards */}
          <Route path="/course/:courseId" element={<CourseDetails />} /> {/* Course details page */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
