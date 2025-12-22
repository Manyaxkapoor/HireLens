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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">ATS Resume Scanner</h1>
        <p className="text-lg text-gray-600">Upload your resume and job description for explainable ATS scoring</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Resume (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{result.combined_score.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Combined Score</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{result.keyword_score.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Keyword Match</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{result.semantic_score.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Semantic Match</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Explanations</h3>
            <ul className="list-disc list-inside space-y-1">
              {result.explanations.map((exp, index) => (
                <li key={index} className="text-gray-700">{exp}</li>
              ))}
            </ul>
          </div>

          {result.matched_skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Matched Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.matched_skills.map((skill, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.missing_skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.missing_skills.map((skill, index) => (
                  <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.recommendations && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
              {result.recommendations.projects.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Suggested Projects:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {result.recommendations.projects.map((project, index) => (
                      <li key={index} className="text-gray-700">{project}</li>
                    ))}
                  </ul>
                </div>
              )}
              {result.recommendations.resume_improvements.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Resume Improvements:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {result.recommendations.resume_improvements.map((tip, index) => (
                      <li key={index} className="text-gray-700">{tip}</li>
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