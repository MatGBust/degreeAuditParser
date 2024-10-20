import React from 'react';
import './Popup.css';

const Popup = ({ content, handleClose }) => {
    return (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={handleClose}>X</button>
                {content}
            </div>
        </div>
    );
};

export default Popup;
