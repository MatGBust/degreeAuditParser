import React, { useState } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import './Home.css';
import { parseAuditHTML } from '../../util/api';

const Home = () => {

  const [categories, setCategories] = useState([]); 

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target.result; // Get the file content as a string


            // Now you can parse the HTML string with DOMParser
            const parsedData = parseAuditHTML(fileContent);
            setCategories(parsedData); // Store the parsed data in state
        };

        reader.onerror = (e) => {
            console.error("Error reading file:", e);
        };

        reader.readAsText(file); // Read the file as text
    }
};
  

  return (
    <div className="category-cards-container">
      <h1>Hi Buckeye! Upload your degree audit here!</h1>
      <div className="upload-container">
        <label className="upload-button">
          Upload Degree Audit
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} accept=".html" />
        </label>
      </div>


      {categories.length > 0 ? (
        categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))
      ) : (
        <p>No audit uploaded yet.</p>
      )}

      
    </div>
  );
};

export default Home;