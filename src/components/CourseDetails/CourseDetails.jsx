import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchData } from '../../util/api';

const CourseDetails = () => {
    const location = useLocation();
    const { category } = location.state || {};
    const [classDataMap, setClassDataMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    if (!category) {
        return <div>No course details available.</div>;
    }

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const classMap = {};

                // Loop through completed classes
                for (const className of category.class.completed) {
                    const [subject, classNumber] = className.split(/\s+/);
                    const classData = await fetchData(subject, classNumber);
                    classMap[className] = {
                        ...classData,
                        status: 'completed', // Tag the class as completed
                    };
                }

                // Loop through incompleted classes
                for (const className of category.class.incompleted) {
                    const [subject, classNumber] = className.split(/\s+/);
                    const classData = await fetchData(subject, classNumber);
                    classMap[className] = {
                        ...classData,
                        status: 'incompleted', // Tag the class as incompleted
                    };
                }

                // Set the class map in the state
                setClassDataMap(classMap);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchClassData(); // Fetch data when the component mounts
    }, []); // Empty dependency array to run once

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div>
            <h2>{category.title}</h2> {/* Category title */}
            <p>Completed Courses:</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {category.class.completed.map((completedClass, index) => (
                    <li key={index}>{classDataMap[completedClass].title}</li> // Display each completed class
                ))}
            </ul>
            <p>Need to Complete Courses:</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {category.class.incompleted.map((incompleteClass, index) => (
                    <li key={index}>{classDataMap[incompleteClass].title}</li> // Display each completed class
                ))}
            </ul>
        </div>
    );
};

export default CourseDetails;