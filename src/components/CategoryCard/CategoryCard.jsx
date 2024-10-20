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
            <p>{category.credits} credits</p>
            <p>{category.completed ? 'Completed' : 'Not Completed'}</p>
        </div>
    );
};

export default CategoryCard