import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MyContextProvider } from './context/MyContext'; // Make sure this is correctly exported
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </React.StrictMode>,
);