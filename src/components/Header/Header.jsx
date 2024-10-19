// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Degree Audit Parser</h1>
      <div className="user-info">
        <img src="/path-to-user-avatar.png" alt="User Avatar" />
        <span>Welcome, Kyle!</span>
      </div>
    </header>
  );
};

export default Header;