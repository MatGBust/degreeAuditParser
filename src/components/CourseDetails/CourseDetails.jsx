import React from 'react';
import { useLocation } from 'react-router-dom';

const CourseDetails = () => {
    const location = useLocation();
    const { category } = location.state || {};

    if (!category) {
        return <div>No course details available.</div>;
    }

    return (
        <div>
            <h1>Course Details for: {category.title}</h1>
            <p>Credits: {category.credits}</p>
            <p>Status: {category.completed ? 'Completed' : 'Not Completed'}</p>
            {/* Add more detailed course information here */}
        </div>
    );
};

export default CourseDetails;