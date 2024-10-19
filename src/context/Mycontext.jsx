// src/context/MyContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create a context
const MyContext = createContext();

// Create a provider component
export const MyContextProvider = ({ children }) => {
  // Example state to be shared across components
  const [user, setUser] = useState(null); // Replace with your actual state

  // Example function to log in a user
  const login = (userData) => {
    setUser(userData);
  };

  // Example function to log out a user
  const logout = () => {
    setUser(null);
  };

  return (
    <MyContext.Provider value={{ user, login, logout }}>
      {children}
    </MyContext.Provider>
  );
};

// Create a custom hook to use the context
export const useMyContext = () => {
  return useContext(MyContext);
};