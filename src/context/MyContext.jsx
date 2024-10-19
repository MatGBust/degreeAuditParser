// src/context/MyContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context
const MyContext = createContext();

// Create a Provider component
export const MyContextProvider = ({ children }) => {
  const [state, setState] = useState(null); // or your initial state

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

// Optionally, you can also export the context itself if needed
export const useMyContext = () => {
  return useContext(MyContext);
};