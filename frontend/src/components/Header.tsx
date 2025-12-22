import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">HireLens</Link>
          <nav>
            <Link to="/" className="mr-4 hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;