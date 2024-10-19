import React from 'react';
import { useParams } from 'react-router-dom';

function CourseDetails() {
  const { courseTitle } = useParams(); // Get course title from route parameter

  return (
    <div>
      <h1>Course Details for: {courseTitle}</h1>
      {/* Add more detailed course information here */}
    </div>
  );
}

export default CourseDetails;