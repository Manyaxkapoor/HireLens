import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl">
      <div className="container mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <Search className="group-hover:scale-110 transition-transform duration-200" size={28} />
            <span className="text-2xl font-bold tracking-tight">HireLens</span>
          </Link>
          <nav className="flex space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-white/20 font-semibold' 
                  : 'hover:bg-white/10'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/about" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/about') 
                  ? 'bg-white/20 font-semibold' 
                  : 'hover:bg-white/10'
              }`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;