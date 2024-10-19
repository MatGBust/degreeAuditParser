// src/components/Home/Home.jsx
import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import './Home.css';

const Home = () => {
  

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      console.log('Uploaded file:', file);

      // Example: Send the PDF to a parser
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const arrayBuffer = e.target.result;

        // Example: Parsing with pdf-lib (you can choose another library)
        // const pdfDoc = await PDFDocument.load(arrayBuffer);
        // const textContent = await pdfDoc.getTextContent();
        // console.log('Parsed PDF content:', textContent);

        // Alternatively, send the PDF to the server for further processing
        // sendPdfToServer(file);


        const courses = [
          { id: 1, title: 'BASIC MATH & SCIENCE', credits: 3, completed: true },
          { id: 2, title: 'GENERAL COLLEGE OF ENGINEERING REQUIREMENTS', credits: 3, completed: true },
          { id: 3, title: 'COMPUTER SCIENCE & ENGINEERING - MAJOR CORE - PART 1', credits: 3, completed: true },
          { id: 4, title: 'COMPUTER SCIENCE & ENGINEERING - MAJOR CORE - PART 2', credits: 4, completed: false },
          {id: 5, title: 'COMPUTER SCIENCE & ENG - TECH/DIRECT/TARGET ELECTIVES', credits: 3, completed: false}
          // Add more courses as needed
        ];

        console.log('PDF successfully processed');
      };
      fileReader.readAsArrayBuffer(file);
    } else {
      console.error('Please upload a valid PDF file.');
    }
  };

  return (
    <div className="course-cards-container">
      <h1>Hi Buckeye! Upload your degree audit here!</h1>
      <div className="upload-container">
        <label className="upload-button">
          Upload
          <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
        </label>
      </div>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
      
      
    </div>
  );
};

export default Home;