import React from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => (
  <section className="relative text-center py-20 bg-gradient-to-br from-purple-100 via-pink-50 via-blue-50 to-cyan-100 rounded-3xl shadow-2xl overflow-hidden">
    {/* Decorative background elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-16 right-12 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-25 animate-bounce delay-500"></div>
      <div className="absolute bottom-12 left-16 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-15 animate-bounce delay-1000"></div>
      <div className="absolute bottom-20 right-8 w-18 h-18 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-20 animate-bounce delay-700"></div>
    </div>
    
    <div className="relative z-10">
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-purple-600 via-pink-600 via-blue-600 to-cyan-600 text-transparent bg-clip-text drop-shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ✨ KYOUYAP'S PORTFOLIO ✨
      </motion.h1>
      
      <motion.div
        className="relative mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 max-w-2xl mx-auto">
          kyouyapのポートフォリオです 🌈<br />
          閲覧していただき誠にありがとうございます 🎉<br />
          <span className="text-lg text-gray-600 mt-2 block">
            機械学習とWeb開発を探求しています！
          </span>
        </p>
      </motion.div>

      {/* Interactive buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.a
          href="/portfolio"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🚀 Portfolio を見る
        </motion.a>
        <motion.a
          href="/about"
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          💻 About Me
        </motion.a>
      </motion.div>
      
      {/* Fun badges */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-full text-sm font-medium shadow-lg">
          🤖 Machine Learning
        </span>
        <span className="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full text-sm font-medium shadow-lg">
          🌐 Web Development
        </span>
        <span className="px-4 py-2 bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-full text-sm font-medium shadow-lg">
          🐍 Python & Django
        </span>
        <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm font-medium shadow-lg">
          ⚡ JavaScript
        </span>
      </motion.div>
    </div>
  </section>
);

export default Home;
