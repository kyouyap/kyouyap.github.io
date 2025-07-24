import React from "react";

const Contact: React.FC = () => (


  <div className="relative py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl overflow-hidden">
    <h1 className="text-4xl md:text-6xl font-extrabold mb-8">
      📧 Contact Me
    </h1>

    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/40 mb-8">
      <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-6">
        お気軽にお声がけください！ 🎉<br />
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <span className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-full text-sm font-medium transform hover:scale-105 transition-all duration-300 cursor-pointer">
          <a href="https://github.com/kyouyap" target="_blank" rel="noopener noreferrer">
            💻 GitHub
          </a>
        </span>
        <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-sm font-medium transform hover:scale-105 transition-all duration-300 cursor-pointer">
          <a href="https://twitter.com/kyouyap" target="_blank" rel="noopener noreferrer">
            🐦 Twitter
          </a>
        </span>
      </div>
    </div>
  </div>
);

export default Contact;
