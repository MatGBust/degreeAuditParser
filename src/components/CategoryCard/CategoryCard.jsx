import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  // Calculate progress percentage
  const progress = category.completed ? 100 : 0; // Example: 100% if completed, 0% if not

  return (
    <Link to={`/category/${category.id}`} className="category-card">
      <div className="category-card-content">
        <h2>{category.title}</h2>
        <p>Credits: {category.credits}</p>
        
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <p>{category.completed ? 'Completed' : 'Not Completed'}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;