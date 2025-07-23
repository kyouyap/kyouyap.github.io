import React from "react";

const About: React.FC = () => (
  <section className="max-w-xl mx-auto py-16 bg-gradient-to-br from-pink-100 via-white to-yellow-100 rounded-xl shadow-md">
    <h2 className="text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 drop-shadow-lg">About</h2>
    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
      <li>機械学習（コンペティションの成績はblogにて）</li>
      <li>簡単なweb制作</li>
      <li>Django</li>
      <li>スクレイピング</li>
      <li>JavaScript</li>
    </ul>
  </section>
);

export default About;
