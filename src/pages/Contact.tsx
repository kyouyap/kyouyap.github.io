import React from "react";

const Contact: React.FC = () => (
  <section className="relative flex flex-col items-center justify-center text-center py-20 bg-gradient-to-br from-orange-100 via-pink-50 via-purple-50 to-blue-100 rounded-3xl shadow-2xl overflow-hidden">
    {/* Background decorations */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-8 left-8 w-24 h-24 bg-gradient-to-r from-orange-300 to-red-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-20 right-12 w-20 h-20 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
      <div className="absolute bottom-12 left-16 w-28 h-28 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-25 animate-pulse delay-500"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-green-300 to-teal-300 rounded-full opacity-20 animate-pulse delay-1500"></div>
    </div>
    
    <div className="relative z-10 max-w-2xl mx-auto px-8">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 drop-shadow-2xl">
        📧 Contact Me
      </h1>
      
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/40 mb-8">
        <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-6">
          お気軽にお声がけください！ 🎉<br />
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          <a
            href="mailto:kyouyap@gmail.com"
            className="flex items-center px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="text-2xl mr-3">📧</span>
            Email
          </a>
        </div>
      </div>
      
      {/* Social links section */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-4">
          🌐 Follow Me
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <a href="https://github.com/kyouyap" target="_blank" rel="noopener noreferrer">
              💻 GitHub
            </a>
          </span>
          <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <a href="https://twitter.com/kyouyap" target="_blank" rel="noopener noreferrer">
              🐦 Twitter
            </a>
          </span>
        </div>
      </div>
      
    </div>
  </section>
);

export default Contact;
