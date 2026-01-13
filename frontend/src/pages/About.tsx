import React from 'react';
import { Target, Brain, Zap, Shield } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Target className="text-blue-600" size={32} />,
      title: "ATS Scoring",
      description: "Advanced algorithms that simulate real ATS systems to evaluate your resume's compatibility with job descriptions."
    },
    {
      icon: <Brain className="text-indigo-600" size={32} />,
      title: "Explainable AI",
      description: "Get transparent, human-readable explanations for every score instead of black-box decision making."
    },
    {
      icon: <Zap className="text-purple-600" size={32} />,
      title: "Smart Recommendations",
      description: "Receive actionable suggestions for improving your resume, including missing skills and project ideas."
    },
    {
      icon: <Shield className="text-green-600" size={32} />,
      title: "Privacy First",
      description: "Your resume data is processed securely and never stored permanently on our servers."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          About HireLens
        </h1>
        <p className="text-xl text-gray-600">
          Making ATS systems transparent and helping candidates succeed
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What is HireLens?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          HireLens is an <strong>explainable AI system</strong> that simulates how modern Applicant Tracking Systems (ATS) 
          evaluate resumes. Unlike traditional ATS tools that provide opaque scores, HireLens gives you detailed insights 
          into why you received a particular score and what you can do to improve.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Built with cutting-edge NLP technology and semantic analysis, HireLens analyzes your resume against job 
          descriptions to identify matched skills, missing competencies, and provides personalized recommendations 
          for improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
        <ol className="space-y-4">
          <li className="flex items-start">
            <span className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</span>
            <div>
              <h3 className="font-semibold text-gray-800">Upload Your Resume</h3>
              <p className="text-gray-600">Upload your resume in PDF format for analysis</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</span>
            <div>
              <h3 className="font-semibold text-gray-800">Paste Job Description</h3>
              <p className="text-gray-600">Provide the job description you're targeting</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</span>
            <div>
              <h3 className="font-semibold text-gray-800">Get AI Analysis</h3>
              <p className="text-gray-600">Receive detailed scores, explanations, and recommendations</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</span>
            <div>
              <h3 className="font-semibold text-gray-800">Improve & Iterate</h3>
              <p className="text-gray-600">Apply recommendations and retest until you achieve your target score</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default About;