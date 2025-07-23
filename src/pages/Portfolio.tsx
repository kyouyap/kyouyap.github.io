import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import type { ProjectCategory } from '../types/Project';

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
    <div className="relative py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute top-20 right-16 w-24 h-24 bg-gradient-to-r from-pink-300 to-red-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 left-1/4 w-28 h-28 bg-gradient-to-r from-green-300 to-teal-300 rounded-full opacity-15 animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 px-8">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          💼 My Portfolio
        </motion.h1>
        
        <motion.p
          className="text-xl text-gray-700 text-center mb-8 font-medium bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          これまでに手がけたプロジェクトの一部をご紹介します 🚀<br />
          <span className="text-lg text-gray-600">機械学習からWeb開発まで、幅広い分野で挑戦しています！</span><br />
          <span className="text-sm text-gray-500 mt-2 block">
            💼 実務プロジェクトは技術スタックと抽象化された内容のみ記載しています
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
              className="w-full px-6 py-4 text-lg bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl shadow-lg focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
            />
          </div>

          {/* カテゴリフィルター */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-white/80 text-gray-700 hover:bg-white/90 shadow-md hover:shadow-lg'
              }`}
            >
              🌟 すべて
            </button>
            <button
              onClick={() => setSelectedCategory('featured')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'featured'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-white/80 text-gray-700 hover:bg-white/90 shadow-md hover:shadow-lg'
              }`}
            >
              ✨ 注目
            </button>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('work');
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'work'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                  : 'bg-white/80 text-gray-700 hover:bg-white/90 shadow-md hover:shadow-lg hover:scale-105'
              }`}
            >
              💼 実務経験
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-white/90 shadow-md hover:shadow-lg'
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
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-white/40 hover:bg-white/90"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`}></div>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* ステータスバッジ */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      project.status === '完成' 
                        ? 'bg-green-500 text-white' 
                        : project.status === '開発中'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  {/* フィーチャーバッジ */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-500 text-white">
                        ✨ 注目
                      </span>
                    </div>
                  )}
                </div>
                
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
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className={`px-4 py-2 bg-gradient-to-r ${project.gradient} text-white text-sm font-medium rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        🔍 デモを見る
                      </a>
                    )}
                    {project.codeUrl && (
                      <a 
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        💻 コード
                      </a>
                    )}
                    {!project.demoUrl && !project.codeUrl && (
                      <span className="px-6 py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-medium rounded-full shadow-md cursor-not-allowed">
                        🔒 実務プロジェクト
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
        
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-lg text-gray-600 font-medium mb-4">
            もっと多くのプロジェクトをご覧になりたい方は...
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com/kyouyap"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              🌟 GitHub で全てを見る
            </a>
            <button
              onClick={() => setSearchQuery('')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              🔄 検索をクリア
            </button>
          </div>
          
          {/* 統計情報 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-purple-600">{projects.length}</div>
              <div className="text-gray-600">総プロジェクト数</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-green-600">{projects.filter(p => p.status === '完成').length}</div>
              <div className="text-gray-600">完成済み</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-gray-600">技術分野</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
