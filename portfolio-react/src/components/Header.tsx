import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-lg z-10">
      <div className="max-w-7xl mx-auto">
        <nav className="flex gap-8 px-6 h-16 items-center text-lg">
          <Link 
            to="/" 
            className="relative text-gray-800 font-medium hover:text-blue-600 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            Home
          </Link>
          <Link 
            to="/portfolio" 
            className="relative text-gray-800 font-medium hover:text-blue-600 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            Portfolio
          </Link>
          <Link 
            to="/about" 
            className="relative text-gray-800 font-medium hover:text-blue-600 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="relative text-gray-800 font-medium hover:text-blue-600 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
