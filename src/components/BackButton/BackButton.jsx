// BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

function BackButton() {
  const navigate = useNavigate();
  const isFirstPage = window.history.length <= 1;  // Check if this is the first page

  const handleGoBack = () => {
    if (!isFirstPage) {
      navigate(-1);  // Go back only if there's a previous page
    }
  };

  return (
    <button onClick={handleGoBack} disabled={isFirstPage} className="back-button" >
      {isFirstPage ? "No Previous Page" : "<---"}
    </button>
  );
}

export default BackButton;
