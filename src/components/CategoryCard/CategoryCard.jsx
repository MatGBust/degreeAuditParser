import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCard.css'; // Assuming you have styles
import CourseDetails from '../CourseDetails/CourseDetails';


const CategoryCard = ({ category }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleCardClick = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="category-card">
            <div className="card-header" onClick={handleCardClick}>
                <h3>{category.title}</h3>
            </div>
            {isOpen && (
                <div className="card-content">
                <p>Status : {category.isCompleted ? 'Completed' : 'Incomplete'}</p>
                <CourseDetails category={category} />
                </div>
            )}
        </div>
    );
};

export default CategoryCard;