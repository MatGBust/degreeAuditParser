// src/components/SectionPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const SectionPage = () => {
  const { sectionId } = useParams();

  const sectionContent = {
    section1: {
      title: "Section 1",
      content: "This is the content for Section 1.",
    },
    section2: {
      title: "Section 2",
      content: "This is the content for Section 2.",
    },
    section3: {
      title: "Section 3",
      content: "This is the content for Section 3.",
    },
  };

  const section = sectionContent[sectionId];

  return (
    <div>
      <h1>{section.title}</h1>
      <p>{section.content}</p>
    </div>
  );
};

export default SectionPage;