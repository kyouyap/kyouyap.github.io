import React from "react";

const About: React.FC = () => (
  <section className="relative max-w-4xl mx-auto py-20 bg-gradient-to-br from-green-100 via-blue-50 via-purple-50 to-pink-100 rounded-3xl shadow-2xl overflow-hidden">
    {/* Background decorations */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-green-300 to-teal-300 rounded-full opacity-15 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-28 h-28 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
    </div>
    
    <div className="relative z-10 px-8">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 drop-shadow-lg">
        🌟 About Me
      </h2>
      
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/40">
        <div className="text-center mb-8">
          <p className="text-xl text-gray-700 font-medium mb-6 leading-relaxed">
            プログラミングと機械学習に情熱を注ぐ開発者です ✨<br />
            新しい技術を学び、創造的なソリューションを構築することが大好きです！
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              🚀 スキル・専門分野
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                <span className="text-2xl mr-3">🤖</span>
                <span className="text-lg text-gray-700 font-medium">機械学習（コンペティションの成績はblogにて）</span>
              </li>
              <li className="flex items-center p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                <span className="text-2xl mr-3">🌐</span>
                <span className="text-lg text-gray-700 font-medium">簡単なweb制作</span>
              </li>
              <li className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-sm border border-yellow-100 hover:shadow-md transition-shadow">
                <span className="text-2xl mr-3">🐍</span>
                <span className="text-lg text-gray-700 font-medium">Django</span>
              </li>
              <li className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
                <span className="text-2xl mr-3">🕷️</span>
                <span className="text-lg text-gray-700 font-medium">スクレイピング</span>
              </li>
              <li className="flex items-center p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
                <span className="text-2xl mr-3">⚡</span>
                <span className="text-lg text-gray-700 font-medium">JavaScript</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-4">
              💡 興味・関心
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-green-100 to-teal-100 rounded-xl shadow-sm border border-green-200">
                <p className="text-gray-700 font-medium">
                  📊 データサイエンスと機械学習アルゴリズムの研究
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-sm border border-blue-200">
                <p className="text-gray-700 font-medium">
                  🎨 ユーザーフレンドリーなWebアプリケーション開発
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl shadow-sm border border-orange-200">
                <p className="text-gray-700 font-medium">
                  🔧 新しいテクノロジーの探求と実装
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            🎯 Always Learning, Always Creating!
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
