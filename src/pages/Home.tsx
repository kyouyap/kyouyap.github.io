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
  <div className="space-y-10">
    {/* Hero Section */}
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
        ✨ KYOUYAP'S PORTFOLIO ✨
      </h1>
      <div className="bg-gray-100 rounded-lg p-6 mb-8">
        <p className="text-lg text-gray-800 leading-relaxed">
          AI/MLや自動化、データ分析を中心に、業務改善やシステム開発に携わっています。<br />
          要件定義から実装、運用まで幅広く担当し、現場の課題解決を意識したものづくりを心がけています。<br />
          <span className="text-base text-gray-600 mt-2 block">
            最近は生成AIやRAG、業務自動化などのプロジェクトが多めです。
          </span>
        </p>
      </div>
    </motion.div>

    {/* Profile Section */}
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-4">📝 Profile</h2>
      <div className="bg-gray-100 rounded-lg p-6">
        <ul className="list-disc list-inside text-left space-y-1 text-gray-700">
          <li>九州大学 工学部 卒業</li>
          <li>九州大学大学院 システム情報科学府（CS専攻）修了</li>
          <li>大手コンサルティングファーム データ分析部署</li>
        </ul>
      </div>
    </motion.div>

    {/* GitHub Stats Section */}
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">📊 GitHub 統計</h2>
      <div className="bg-gray-100 rounded-lg p-6 space-y-4">
        <div className="flex flex-wrap justify-center gap-4">
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${githubId}&theme=light&hide_border=true&count_private=true`}
            alt="GitHub Stats"
            className="rounded-lg max-w-sm"
          />
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubId}&layout=compact&theme=light&hide_border=true`}
            alt="Top Langs"
            className="rounded-lg max-w-xs"
          />
        </div>
        <div className="flex justify-center">
          <img
            src={`https://github-contributor-stats.vercel.app/api?username=${githubId}&limit=5&combine_all_yearly_contributions=true&theme=light`}
            alt="Contributor Stats"
            className="rounded-lg max-w-md"
          />
        </div>
      </div>
    </motion.div>

    {/* Skills Section */}
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <h2 className="text-2xl font-semibold mb-4">🚀 スキル</h2>
      <div className="bg-gray-100 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="bg-white rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const logoParam = skill.logo ? `&logo=${encodeURIComponent(skill.logo)}&logoColor=white` : "";
                  const url = `https://img.shields.io/badge/${encodeURIComponent(skill.name)}-${skill.color}?style=flat-square${logoParam}`;
                  return (
                    <img
                      key={skill.name}
                      src={url}
                      alt={skill.name}
                      className="h-5"
                    />
                  );
                })}
              </div>
            </div>
          ))}
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
      <div className="bg-gray-100 rounded-lg p-6">
        <motion.div
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl mr-2">🎯</span>
          <span>Always Learning, Always Creating!</span>
        </motion.div>
      </div>
    </motion.div>
  </div>
); export default Home;
