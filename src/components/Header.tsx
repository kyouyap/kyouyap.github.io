import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-white/85 via-purple-50/85 to-pink-50/85 backdrop-blur-md border-b border-white/40 shadow-xl z-50">
      <div className="max-w-7xl mx-auto">
        <nav className="flex gap-8 px-6 h-16 items-center text-lg">
          <Link 
            to="/" 
            className="relative text-gray-800 font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-600 after:to-pink-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            🏠 Home
          </Link>
          <Link 
            to="/portfolio" 
            className="relative text-gray-800 font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-cyan-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            💼 Portfolio
          </Link>
          <Link 
            to="/about" 
            className="relative text-gray-800 font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-green-600 after:to-teal-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            🌟 About
          </Link>
          <Link 
            to="/contact" 
            className="relative text-gray-800 font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-orange-600 after:to-red-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            📧 Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
