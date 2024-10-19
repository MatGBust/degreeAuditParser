import React, { useState, useEffect } from 'react';
import './DegreeAuditParser.css'; // Optional: if you have styles for the audit parser

function DegreeAuditParser() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch data from local file or API
    fetch('/data.json') // Make sure this path is correct and accessible
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCourses(data.courses))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <section className="degree-audit-parser">
      <h2>Your Degree Progress</h2>
      <div className="audit-content">
        <ul>
          {courses.length > 0 ? (
            courses.map(course => (
              <li key={course.name}>
                {course.name} - {course.credits} credits ({course.status})
              </li>
            ))
          ) : (
            <li>No courses found.</li>
          )}
        </ul>
      </div>
    </section>
  );
}

export default DegreeAuditParser;