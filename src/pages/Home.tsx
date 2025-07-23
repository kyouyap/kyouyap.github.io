import React from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => (
  <section className="text-center py-20">
    <motion.h1
      className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Welcome to My Portfolio
    </motion.h1>
    <motion.p
      className="text-xl text-gray-600 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      I create web apps and explore machine learning. Take a look around!
    </motion.p>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <a
        href="/portfolio"
        className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        View Portfolio
      </a>
    </motion.div>
  </section>
);

export default Home;
