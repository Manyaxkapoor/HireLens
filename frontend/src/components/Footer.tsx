import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">HireLens</h3>
            <p className="text-gray-400 text-sm">Explainable Resume Screening & Skill Intelligence</p>
          </div>
          
          <div className="flex space-x-6">
            <a
              href="https://github.com/manyaxkapoor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={24} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            
            <a
              href="https://linkedin.com/in/manyaakapoor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} HireLens. The Resume Scanner </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
