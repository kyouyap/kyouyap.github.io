import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const skills = [
    { icon: '🤖', title: '機械学習', desc: 'コンペティションの成績はblogにて', gradient: 'from-blue-500 to-purple-500' },
    { icon: '🌐', title: 'Web制作', desc: '簡単なweb制作', gradient: 'from-green-500 to-teal-500' },
    { icon: '🐍', title: 'Django', desc: 'Python Webフレームワーク', gradient: 'from-yellow-500 to-orange-500' },
    { icon: '🕷️', title: 'スクレイピング', desc: 'データ収集と自動化', gradient: 'from-purple-500 to-pink-500' },
    { icon: '⚡', title: 'JavaScript', desc: 'フロントエンド開発', gradient: 'from-indigo-500 to-blue-500' },
  ];

  const interests = [
    { icon: '📊', title: 'データサイエンス', desc: '機械学習アルゴリズムの研究', color: 'from-emerald-400 to-teal-400' },
    { icon: '🎨', title: 'UI/UX Design', desc: 'ユーザーフレンドリーなWebアプリケーション開発', color: 'from-blue-400 to-purple-400' },
    { icon: '🔧', title: 'テクノロジー', desc: '新しいテクノロジーの探求と実装', color: 'from-orange-400 to-red-400' },
  ];

  return (
    <motion.section
      className="relative max-w-6xl mx-auto py-16 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative z-10 px-6">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text text-shadow-lg">
            🌟 About Me
          </h2>
          <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 border-white border-opacity-30 backdrop-blur-xl">
            <p className="text-xl md:text-2xl text-brand-dark font-medium leading-relaxed mb-4">
              プログラミングと機械学習に情熱を注ぐ開発者です ✨
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              新しい技術を学び、創造的なソリューションを構築することが大好きです！
            </p>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            🚀 スキル・専門分野
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                className="glass-card rounded-2xl p-6 border-white border-opacity-20 hover:border-white hover:border-opacity-40 transition-all duration-300 group cursor-pointer backdrop-blur-md"
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { type: "spring" as const, stiffness: 300, damping: 15 }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.3 + index * 0.1, duration: 0.6 }
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`text-4xl p-3 rounded-xl bg-gradient-to-r ${skill.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-brand-dark mb-2">{skill.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{skill.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            💡 興味・関心
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.6 + index * 0.15, duration: 0.6 }
                }}
                whileHover={{ y: -5 }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${interest.color} text-white text-3xl mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  {interest.icon}
                </div>
                <h4 className="text-xl font-bold text-brand-dark mb-3">{interest.title}</h4>
                <p className="text-gray-600 leading-relaxed">{interest.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <div className="glass-card rounded-3xl p-8 max-w-2xl mx-auto border-white border-opacity-30 backdrop-blur-xl">
            <motion.div
              className="inline-flex items-center px-8 py-4 bg-gradient-brand text-white font-bold rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl mr-3">🎯</span>
              <span>Always Learning, Always Creating!</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
