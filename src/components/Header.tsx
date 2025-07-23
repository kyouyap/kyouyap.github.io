import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '🏠 Home' },
    { path: '/portfolio', label: '💼 Portfolio' },
    { path: '/contact', label: '📧 Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-100 border-b border-gray-700 shadow-lg z-50 backdrop-blur-none">
      <div className="max-w-7xl mx-auto">
        <nav className="flex justify-center items-center px-8 h-20">
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-8 py-4 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 ${isActive
                    ? 'bg-white text-gray-900 shadow-xl'
                    : 'text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 shadow-lg hover:shadow-xl'
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Subtle glow effect for active item */}
                  {isActive && (
                    <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-30"></div>
                  )}
                  {/* Hover glow effect */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
