import React, { useState } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import './Home.css';

const Home = () => {

  const [categories, setCategories] = useState([]); 

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      console.log('Uploaded file:', file);

      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const arrayBuffer = e.target.result;

        // Here you would parse the PDF (using a library like pdf-lib, for example)
        // For now, let's simulate parsing with dummy data:
        const parsedCategories = [
          { id: 1, title: 'BASIC MATH & SCIENCE', credits: 3, completed: true },
          { id: 2, title: 'GENERAL COLLEGE OF ENGINEERING REQUIREMENTS', credits: 3, completed: true },
          { id: 3, title: 'COMPUTER SCIENCE & ENGINEERING - MAJOR CORE - PART 1', credits: 3, completed: true },
          { id: 4, title: 'COMPUTER SCIENCE & ENGINEERING - MAJOR CORE - PART 2', credits: 4, completed: false },
          { id: 5, title: 'COMPUTER SCIENCE & ENG - TECH/DIRECT/TARGET ELECTIVES', credits: 3, completed: false },
        ];

        // Update the courses state with the parsed courses
        setCategories(parsedCategories);
        // Example: Parsing with pdf-lib (you can choose another library)
        // const pdfDoc = await PDFDocument.load(arrayBuffer);
        // const textContent = await pdfDoc.getTextContent();
        // console.log('Parsed PDF content:', textContent);

        // Alternatively, send the PDF to the server for further processing
        // sendPdfToServer(file);

        console.log('PDF successfully processed');
      };
      fileReader.readAsArrayBuffer(file);
    } else {
      console.error('Please upload a valid PDF file.');
    }
  };

  return (
    <div className="category-cards-container">
      <h1>Hi Buckeye! Upload your degree audit here!</h1>
      <div className="upload-container">
        <label className="upload-button">
          Upload Degree Audit
          <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} accept="application/pdf" />
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