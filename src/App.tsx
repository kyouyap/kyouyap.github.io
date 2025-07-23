import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";

const App: React.FC = () => (
  <Router>
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
    <main className="flex-grow pt-24 px-4 max-w-4xl mx-auto w-full">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 mt-4 border border-gray-100/50 hover:shadow-2xl transition-shadow duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </main>
    <footer className="py-8 text-center text-gray-600 bg-white/80 backdrop-blur-sm mt-12 border-t border-gray-100">
      <p>連絡先はTwitterのDMまでお越しください</p>
    </footer>
    </div>
  </Router>
);

export default App;
