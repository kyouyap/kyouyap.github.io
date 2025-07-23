import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: '🏠 Home', gradient: 'from-brand-primary to-brand-secondary' },
    { path: '/portfolio', label: '💼 Portfolio', gradient: 'from-brand-secondary to-brand-accent' },
    { path: '/about', label: '🌟 About', gradient: 'from-brand-accent to-brand-primary' },
    { path: '/contact', label: '📧 Contact', gradient: 'from-brand-primary to-brand-accent' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full glass-card border-b border-white border-opacity-30 shadow-glass z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        <nav className="flex justify-between items-center px-8 h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300 group-hover:scale-110">
              <span className="text-white text-xl font-bold">K</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">KYOUYAP</span>
          </Link>
          
          {/* Navigation */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 group ${
                    isActive 
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-glow` 
                      : 'text-brand-dark hover:text-white hover:bg-white hover:bg-opacity-20'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {!isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  )}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
          
          {/* Mobile menu button (可视化预留) */}
          <button className="sm:hidden p-2 rounded-lg glass-button">
            <svg className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
