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
            <h2>{category.title}</h2> {/* Category title */}
            <p>Completed Courses:</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {category.class.completed.map((completedClass, index) => (
                    <li key={index}>{completedClass}</li> // Display each completed class
                ))}
            </ul>
            <p>Need to Complete Courses:</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {category.class.incompleted.map((incompleteClass, index) => (
                    <li key={index}>{incompleteClass}</li> // Display each completed class
                ))}
            </ul>
        </div>
    );
};

export default CourseDetails;