import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About HireLens</h1>
      <p className="text-gray-600 mb-4">
        HireLens is an explainable AI system that simulates how modern Applicant Tracking Systems (ATS) evaluate resumes.
      </p>
    </div>
  );
};

export default About;