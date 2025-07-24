import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Header from "./components/Header";

const App: React.FC = () => (
  <Router>
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow flex justify-center items-start px-20 py-10">
        <div className="max-w-xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>
      <footer className="py-6 text-center text-gray-600 bg-white">
        <div className="max-w-xl mx-auto px-6">
          <span>© 2025 KYOUYAP</span>
        </div>
      </footer>
    </div>
  </Router>
);

export default App;
