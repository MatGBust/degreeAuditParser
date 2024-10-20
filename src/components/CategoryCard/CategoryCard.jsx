import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCard.css'; // Assuming you have styles

const CategoryCard = ({ category }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/course/${category.id}`, { state: { category } });
    };

    return (
        <div className="category-card" onClick={handleCardClick}>
            <h3>{category.title}</h3>
            <p>Status: {category.isCompleted ? 'Completed' : 'Incomplete'}</p>
        </div>
    );
};

export default CategoryCard;