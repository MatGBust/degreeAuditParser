import React, { useState, useContext, useEffect } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import './Home.css';
import { parseAuditHTML } from '../../util/api';
import { UploadContext } from '../../context/UploadContext';
import pirate from './pirate.png';

const Home = () => {
  const { uploadedData, setUploadedData } = useContext(UploadContext);
  const [categories, setCategories] = useState([]);
  const [isImageVisible, setIsImageVisible] = useState(true); // State for image visibility

  useEffect(() => {
      if (uploadedData) {
          const parsedData = parseAuditHTML(uploadedData);
          setCategories(parsedData);
      }
  }, [uploadedData]);

  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const fileContent = e.target.result;
              const parsedData = parseAuditHTML(fileContent);
              setCategories(parsedData);
              setUploadedData(fileContent);
              setIsImageVisible(false); // Hide the image after upload
          };
          reader.onerror = (e) => {
              console.error("Error reading file:", e);
          };
          reader.readAsText(file);
      }
  };

  const completedCategories = categories.filter(category => category.isCompleted);
  const incompleteCategories = categories.filter(category => !category.isCompleted);

  return (
      <div className="category-cards-container">
          <h1>Ahoy Buckeye! Upload ye degree audit at the input box here!</h1>
          <div className="upload-container">
              <label className="upload-button">
                  Upload Degree Audit
                  <input type="file" onChange={handleFileChange} style={{ display: 'none' }} accept=".html" />
              </label>
              {isImageVisible && <img src={pirate} alt="OSU Logo" />} {/* Conditionally render the image */}
          </div>
          {categories.length > 0 ? (
              <>
                  <h2>Incomplete Categories</h2>
                  <div className="category-list">
                      {incompleteCategories.map(category => (
                          <CategoryCard key={category.id} category={category} />
                      ))}
                  </div>
                  <h2>Completed Categories</h2>
                  <div className="category-list">
                      {completedCategories.map(category => (
                          <CategoryCard key={category.id} category={category} />
                      ))}
                  </div>
              </>
          ) : (
              <p>No audit uploaded yet.</p>
          )}
      </div>
  );
};

export default Home;