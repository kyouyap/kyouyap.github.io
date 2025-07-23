import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import type { ProjectCategory } from '../types/Project';

const badgeMap: Record<string, { color: string; logo?: string }> = {
  Python: { color: '3776AB', logo: 'python' },
  FastAPI: { color: '009688', logo: 'fastapi' },
  Langchain: { color: '000000', logo: 'langchain' },
  OpenAI: { color: '412991', logo: 'openai' },
  ChatGPT: { color: '10A37F', logo: 'openai' },
  AWS: { color: '232F3E', logo: 'amazonaws' },
  Docker: { color: '2496ED', logo: 'docker' },
  PostgreSQL: { color: '4169E1', logo: 'postgresql' },
  React: { color: '61DAFB', logo: 'react' },
  Vite: { color: '646CFF', logo: 'vite' },
  TailwindCSS: { color: '06B6D4', logo: 'tailwindcss' },
  Django: { color: '092E20', logo: 'django' },
  Jenkins: { color: 'D24939', logo: 'jenkins' },
  'Vue.js': { color: '4FC08D', logo: 'vuedotjs' },
  Databricks: { color: 'FF3621', logo: 'databricks' },
  Streamlit: { color: 'FF4B4B', logo: 'streamlit' },
  'scikit-learn': { color: 'F7931E', logo: 'scikitlearn' },
  pandas: { color: '150458', logo: 'pandas' },
  PyTorch: { color: 'EE4C2C', logo: 'pytorch' },
  LightGBM: { color: '9ACD32', logo: 'lightgbm' },
  Quart: { color: '222222' },
  Whisper: { color: '5A5A5A' },
  BERT: { color: 'F9DC3E' },
  NLP: { color: '1A237E' },
  RealtimeAPI: { color: 'FF9800' },
  Azure: { color: '0078D4', logo: 'azuredevops' },
  'Step Functions': { color: 'FF4F1F' },
  '可視化ライブラリ': { color: '6366F1' },
  'プロンプトエンジニアリング': { color: '6366F1' },
  '音声認識': { color: '14B8A6' },
  'テキスト分析': { color: 'F97316' },
  'アノテーション設計': { color: 'F59E42' },
};

const Portfolio = () => {
  const {
    projects,
    loading,
    error,
    filterByCategory,
    getFeaturedProjects,
    searchProjects,
    getCategories
  } = useProjects();

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all' | 'featured' | 'work'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const getFilteredProjects = () => {
    let filtered = projects;

    if (searchQuery) {
      filtered = searchProjects(searchQuery);
    } else if (selectedCategory === 'featured') {
      filtered = getFeaturedProjects();
    } else if (selectedCategory === 'work') {
      filtered = projects.filter(project => project.period);
    } else if (selectedCategory !== 'all') {
      filtered = filterByCategory(selectedCategory as ProjectCategory);
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();
  const categories = getCategories();

  return (
    <div className="relative py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute top-20 right-16 w-24 h-24 bg-gradient-to-r from-pink-300 to-red-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 left-1/4 w-28 h-28 bg-gradient-to-r from-green-300 to-teal-300 rounded-full opacity-15 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 px-8">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          💼 My Portfolio
        </motion.h1>

        <motion.p
          className="text-xl text-gray-700 text-center mb-8 font-medium bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          これまでに手がけたプロジェクトの一部をご紹介します<br />
          <span className="text-sm text-gray-500 mt-2 block">
            実務プロジェクトは技術スタックと抽象化された内容のみ記載しています
          </span>
        </motion.p>

        {/* 検索とフィルタリング */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* 検索バー */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 プロジェクトを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
            />
          </div>

          {/* カテゴリフィルター */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105'
                : 'bg-white/80 text-gray-700'
                }`}
            >
              🌟 すべて
            </button>
            <button
              onClick={() => setSelectedCategory('featured')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === 'featured'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105'
                : 'bg-white/80 text-gray-700'
                }`}
            >
              ✨ 注目
            </button>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('work');
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === 'work'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white scale-105'
                : 'bg-white/80 text-gray-700 hover:scale-105'
                }`}
            >
              💼 実務経験
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105'
                  : 'bg-white/80 text-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProjects.length === 0 ? (
            <motion.div
              className="col-span-full text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">プロジェクトが見つかりませんでした</h3>
              <p className="text-gray-500">検索条件を変更してみてください</p>
            </motion.div>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 border border-white/40"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >


                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* プロジェクト期間の表示 */}
                  {project.period && (
                    <div className="mb-3">
                      <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                        📅 {project.period}
                      </span>
                    </div>
                  )}

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => {
                      const badge = badgeMap[tag] || { color: "6B7280" };
                      const logoParam = badge.logo ? `&logo=${encodeURIComponent(badge.logo)}&logoColor=white` : "";
                      const url = `https://img.shields.io/badge/${encodeURIComponent(tag)}-${badge.color}?style=flat-square${logoParam}`;
                      return (
                        <img
                          key={tagIndex}
                          src={url}
                          alt={tag}
                          className="h-6"
                          style={{ marginRight: 4, marginBottom: 4 }}
                        />
                      );
                    })}
                  </div>

                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full transform hover:scale-105 transition-all duration-300"
                      >
                        🔍 デモを見る
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-medium rounded-full transform hover:scale-105 transition-all duration-300"
                      >
                        💻 コード
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
