import React from 'react';
import { motion } from 'framer-motion';

const githubId = "kyouyap";

const skillCategories = [
  {
    title: "言語",
    skills: [
      { name: "Python", color: "3776AB", logo: "python" },
      { name: "JavaScript", color: "F7DF1E", logo: "javascript" },
      { name: "SQL", color: "003B57", logo: "postgresql" },
    ],
  },
  {
    title: "フレームワーク・ライブラリ",
    skills: [
      { name: "Django", color: "092E20", logo: "django" },
      { name: "FastAPI", color: "009688", logo: "fastapi" },
      { name: "React", color: "61DAFB", logo: "react" },
      { name: "Vue.js", color: "4FC08D", logo: "vuedotjs" },
      { name: "Langchain", color: "000000", logo: "langchain" },
      { name: "TailwindCSS", color: "06B6D4", logo: "tailwindcss" },
      { name: "Streamlit", color: "FF4B4B", logo: "streamlit" },
    ],
  },
  {
    title: "ビッグデータ・クラウド",
    skills: [
      { name: "Databricks", color: "FF3621", logo: "databricks" },
      { name: "AWS", color: "232F3E", logo: "amazonaws" },
      { name: "Azure", color: "0078D4", logo: "azuredevops" },
    ],
  },
  {
    title: "機械学習・データ分析",
    skills: [
      { name: "scikit-learn", color: "F7931E", logo: "scikitlearn" },
      { name: "PyTorch", color: "EE4C2C", logo: "pytorch" },
      { name: "LightGBM", color: "9ACD32", logo: "lightgbm" },
      { name: "pandas", color: "150458", logo: "pandas" },
      { name: "BERT", color: "F9DC3E" },
      { name: "NLP", color: "1A237E" },
      { name: "Whisper", color: "5A5A5A" },
    ],
  },
  {
    title: "インフラ・その他",
    skills: [
      { name: "Docker", color: "2496ED", logo: "docker" },
      { name: "Jenkins", color: "D24939", logo: "jenkins" },
      { name: "PostgreSQL", color: "4169E1", logo: "postgresql" },
      { name: "Vite", color: "646CFF", logo: "vite" },
    ],
  },
  {
    title: "エディタ",
    skills: [
      { name: "VSCode", color: "007ACC", logo: "visualstudiocode" },
    ],
  },
];

const Home: React.FC = () => (
  <section className="relative text-center py-20 bg-gradient-to-br from-purple-100 via-pink-50 via-blue-50 to-cyan-100 rounded-3xl overflow-hidden">
    {/* Decorative background elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-16 right-12 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-25 animate-bounce delay-500"></div>
      <div className="absolute bottom-12 left-16 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-15 animate-bounce delay-1000"></div>
      <div className="absolute bottom-20 right-8 w-18 h-18 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-20 animate-bounce delay-700"></div>
    </div>

    <div className="relative z-10">
      {/* Hero */}
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-purple-600 via-pink-600 via-blue-600 to-cyan-600 text-transparent bg-clip-text"
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
        <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 max-w-2xl mx-auto">
          AI/MLや自動化、データ分析を中心に、業務改善やシステム開発に携わっています。<br />
          要件定義から実装、運用まで幅広く担当し、現場の課題解決を意識したものづくりを心がけています。<br />
          <span className="text-lg text-gray-600 mt-2 block">
            最近は生成AIやRAG、業務自動化などのプロジェクトが多めです。
          </span>
        </p>
      </motion.div>

      {/* Profile */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">👤 Profile</h2>
        <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 border-white border-opacity-30 backdrop-blur-xl">
          <ul className="text-lg md:text-xl text-gray-700 leading-relaxed text-left space-y-2">
            <li>九州大学 工学部 卒業</li>
            <li>九州大学大学院 システム情報科学府（CS専攻）修了</li>
            <li>大手コンサルティングファーム データ分析部署</li>
          </ul>
        </div>
      </motion.div>

      {/* GitHub Stats */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">📊 GitHub 統計</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <img src={`https://github-readme-stats.vercel.app/api?username=${githubId}&theme=dark&hide_border=false&count_private=true`} alt="GitHub Stats" className="rounded-xl" />
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <img src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubId}&layout=compact`} alt="Top Langs" className="rounded-xl" />
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <img src={`https://github-contributor-stats.vercel.app/api?username=${githubId}&limit=5&combine_all_yearly_contributions=true`} alt="Contributor Stats" className="rounded-xl" />
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">🚀 スキル</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="glass-card rounded-2xl p-6 border-white border-opacity-20 backdrop-blur-md">
              <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const logoParam = skill.logo ? `&logo=${encodeURIComponent(skill.logo)}&logoColor=white` : "";
                  const url = `https://img.shields.io/badge/${encodeURIComponent(skill.name)}-${skill.color}?style=flat-square${logoParam}`;
                  return (
                    <img
                      key={skill.name}
                      src={url}
                      alt={skill.name}
                      className="h-6"
                      style={{ marginRight: 4, marginBottom: 4 }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Interests */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">💡 興味・関心</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-white text-3xl mb-4 transition-all duration-300 group-hover:scale-110">
              📊
            </div>
            <h4 className="text-xl font-bold text-brand-dark mb-3">データサイエンス</h4>
            <p className="text-gray-600 leading-relaxed">機械学習アルゴリズムの研究</p>
          </div>
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 text-white text-3xl mb-4 transition-all duration-300 group-hover:scale-110">
              🎨
            </div>
            <h4 className="text-xl font-bold text-brand-dark mb-3">UI/UX Design</h4>
            <p className="text-gray-600 leading-relaxed">ユーザーフレンドリーなWebアプリケーション開発</p>
          </div>
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-orange-400 to-red-400 text-white text-3xl mb-4 transition-all duration-300 group-hover:scale-110">
              🔧
            </div>
            <h4 className="text-xl font-bold text-brand-dark mb-3">テクノロジー</h4>
            <p className="text-gray-600 leading-relaxed">新しいテクノロジーの探求と実装</p>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="glass-card rounded-3xl p-8 max-w-2xl mx-auto border-white border-opacity-30 backdrop-blur-xl">
          <motion.div
            className="inline-flex items-center px-8 py-4 bg-gradient-brand text-white font-bold rounded-2xl transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl mr-3">🎯</span>
            <span>Always Learning, Always Creating!</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Home;
