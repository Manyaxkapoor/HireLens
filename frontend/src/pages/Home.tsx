import React, { useState } from 'react';
import axios from 'axios';

interface ScoreResult {
  combined_score: number;
  keyword_score: number;
  semantic_score: number;
  matched_skills: string[];
  missing_skills: string[];
  explanations: string[];
  recommendations: {
    projects: string[];
    learning_resources: string[];
    resume_improvements: string[];
  };
}

const Home: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume || !jobDescription) {
      setError('Please upload a resume and enter job description');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('job_description', jobDescription);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/score', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (err) {
      setError('Error processing resume. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          ATS Resume Scanner
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get explainable AI-powered insights on your resume's ATS compatibility. 
          Upload your resume and paste a job description to receive detailed feedback.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-8 hover:shadow-2xl transition-shadow duration-300">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center">
            📄 Resume (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
            required
          />
          {resume && (
            <p className="mt-2 text-sm text-green-600">✓ {resume.name}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center">
            💼 Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
            rows={8}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            required
          />
          <p className="mt-2 text-xs text-gray-500">{jobDescription.length} characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Your Resume...
            </span>
          ) : (
            '🚀 Analyze Resume'
          )}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-md animate-pulse">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <p>{error}</p>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">📊</span>
            <h2 className="text-3xl font-bold text-gray-800">Analysis Results</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">{result.combined_score.toFixed(1)}%</div>
              <div className="text-sm font-semibold text-gray-700">Combined Score</div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${result.combined_score}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">{result.keyword_score.toFixed(1)}%</div>
              <div className="text-sm font-semibold text-gray-700">Keyword Match</div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${result.keyword_score}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-purple-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">{result.semantic_score.toFixed(1)}%</div>
              <div className="text-sm font-semibold text-gray-700">Semantic Match</div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${result.semantic_score}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mb-8 bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-2xl mr-2">💡</span>
              AI Explanations
            </h3>
            <ul className="space-y-3">
              {result.explanations.map((exp, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span className="text-gray-700 leading-relaxed">{exp}</span>
                </li>
              ))}
            </ul>
          </div>

          {result.matched_skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-2">✅</span>
                Matched Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.matched_skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200 border border-green-300"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.missing_skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-2">⚠️</span>
                Missing Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.missing_skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200 border border-red-300"
                  >
                    ✗ {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.recommendations && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
              <h3 className="text-xl font-semibold mb-5 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Recommendations
              </h3>
              {result.recommendations.projects.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-lg text-indigo-900">📚 Suggested Projects:</h4>
                  <ul className="space-y-2">
                    {result.recommendations.projects.map((project, index) => (
                      <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                        <span className="text-indigo-500 mr-2 font-bold">{index + 1}.</span>
                        <span className="text-gray-700">{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {result.recommendations.resume_improvements.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 text-lg text-purple-900">✨ Resume Improvements:</h4>
                  <ul className="space-y-2">
                    {result.recommendations.resume_improvements.map((tip, index) => (
                      <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                        <span className="text-purple-500 mr-2 font-bold">{index + 1}.</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;