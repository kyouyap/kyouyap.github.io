import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Header from "./components/Header";

const App: React.FC = () => (
  <Router>
    <div className="flex flex-col min-h-screen bg-gradient-mesh relative overflow-hidden">
      {/* Modern floating elements with enhanced animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-32 w-32 h-32 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-30 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-15 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-25 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>

        {/* Additional mesh gradients */}
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-400 to-transparent opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400 to-transparent opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <Header />
      <main className="flex-grow pt-32 px-6 max-w-6xl mx-auto w-full relative z-10">
        <div className="glass-card rounded-3xl shadow-glass p-12 mt-8 hover:shadow-glow-lg transition-all duration-700 group backdrop-blur-xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>
      <footer className="py-12 text-center text-brand-dark bg-gradient-to-r from-white to-gray-50 opacity-80 backdrop-blur-md mt-16 border-t border-white border-opacity-50 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-600">
            <span>© 2025 KYOUYAP</span>
          </div>
        </div>
      </footer>
    </div>
  </Router>
);

export default App;
