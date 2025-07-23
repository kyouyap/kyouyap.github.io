import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";

const App: React.FC = () => (
  <Router>
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 via-blue-50 to-cyan-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-15 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-green-300 to-teal-300 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <Header />
      <main className="flex-grow pt-24 px-4 max-w-4xl mx-auto w-full relative z-10">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 mt-4 border border-white/30 hover:shadow-3xl transition-all duration-500 hover:bg-white/70">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>
      <footer className="py-8 text-center text-gray-700 bg-gradient-to-r from-white/70 via-purple-50/80 to-pink-50/80 backdrop-blur-md mt-12 border-t border-white/40 relative z-10">
        <p className="font-medium bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          連絡先はTwitterのDMまでお越しください ✨
        </p>
      </footer>
    </div>
  </Router>
);

export default App;
