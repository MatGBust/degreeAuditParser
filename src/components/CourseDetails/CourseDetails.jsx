// CourseDetails.js
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchData } from '../../util/api';
import Popup from '../Popup/Popup';
import { UploadContext } from '../../context/UploadContext';
import './CourseDetails.css';

const CourseDetails = () => {
    const location = useLocation();
    const { category } = location.state || {};
    const { uploadedData } = useContext(UploadContext);
    const [classDataMap, setClassDataMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleClassClick = (courseName) => {
        setSelectedCourse(classDataMap[courseName]);
    };

    const handleClosePopup = () => {
        setSelectedCourse(null);
    };

    useEffect(() => {
        if (!category || !uploadedData) return;
        const fetchClassData = async () => {
            try {
                const classMap = {};
                for (const className of category.class.completed) {
                    const [subject, classNumber] = className.split(/\s+/);
                    let classData = await fetchData(subject, classNumber);
                    if (classData.classNumber !== classNumber) {
                        classData = {
                            classNumber: classNumber, 
                            subject: subject,         
                            title: 'Error Loading Title',
                            units: 0,
                            description: 'Error Loading Description',
                            courseID: '000',
                        };
                    }
                    
                    classMap[className] = { ...classData, status: 'completed' };
                }
                for (const className of category.class.incompleted) {
                    const [subject, classNumber] = className.split(/\s+/);
                    let classData = await fetchData(subject, classNumber);
                    if (classData.classNumber !== classNumber) {
                        classData = {
                            classNumber: classNumber, 
                            subject: subject,         
                            title: 'Error Loading Title',
                            units: 0,
                            description: 'Error Loading Description',
                            courseID: '000',
                        };
                    }
                    classMap[className] = { ...classData, status: 'incompleted' };
                }
                setClassDataMap(classMap);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchClassData();
    }, [category, uploadedData]);

    const calculateTotalCredits = (classes) => {
        return classes.reduce((total, className) => {
            const classData = classDataMap[className];
            return total + (classData ? classData.units : 0);
        }, 0);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const completedCredits = calculateTotalCredits(category.class.completed);
    const incompleteCredits = calculateTotalCredits(category.class.incompleted);

    return (
        <div>
            <h2>{category.title}</h2>
            <div className="course-lists-container">
            <div className="incompleted-courses">
                    <h3>Need to Complete Courses:</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="course-name-column">Course Name</th>
                                <th className="credits-column">Credits</th>
                            </tr>
                        </thead>
                            <tbody>
                                {category.class.incompleted.map((incompleteClass, index) => (
                                <tr key={index} onClick={() => handleClassClick(incompleteClass)} style={{ cursor: 'pointer' }}>
                                    <td className="course-name-column">
                                        {`${classDataMap[incompleteClass]?.subject} ${classDataMap[incompleteClass]?.classNumber}: ${classDataMap[incompleteClass]?.title}` || incompleteClass}
                                    </td>
                                    <td className="credits-column">{classDataMap[incompleteClass]?.units || 'N/A'}</td>
                                </tr>
                                ))}
                                <tr>
                                    <td className="course-name-column"><strong>Total Credits</strong></td>
                                    <td className="credits-column"><strong>{incompleteCredits}</strong></td>
                                    </tr>
                            </tbody>
                    </table>
                </div>
                <div className="completed-courses">
                    <h3>Completed Courses:</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="course-name-column">Course Name</th>
                                <th className="credits-column">Credits</th>
                            </tr>
                        </thead>
                        <tbody>
                                {category.class.completed.map((completeClass, index) => (
                                <tr key={index} onClick={() => handleClassClick(completeClass)} style={{ cursor: 'pointer' }}>
                                    <td className="course-name-column">
                                        {`${classDataMap[completeClass]?.subject} ${classDataMap[completeClass]?.classNumber}: ${classDataMap[completeClass]?.title}` || completeClass}
                                    </td>
                                    <td className="credits-column">{classDataMap[completeClass]?.units || 'N/A'}</td>
                                </tr>
                                ))}
                                <tr>
                                    <td className="course-name-column"><strong>Total Credits</strong></td>
                                    <td className="credits-column"><strong>{completedCredits}</strong></td>
                                    </tr>
                            </tbody>
                    </table>
                </div>
            </div>
            {selectedCourse && (
                <Popup content={
                    <div>
                        <h3>{selectedCourse.title}</h3>
                        <p>
                            <span className="extra-space">Credit Hours: {selectedCourse.units}</span>
                            <span>Course ID: {selectedCourse.courseID}</span>
                        </p>
                        <p>{selectedCourse.description}</p>
                    </div>
                } handleClose={handleClosePopup} />
            )}
        </div>
    );
};

export default CourseDetails