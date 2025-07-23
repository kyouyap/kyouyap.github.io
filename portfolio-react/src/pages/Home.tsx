import React from "react";

const Home: React.FC = () => (
  <section className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-br from-pink-100 via-white to-yellow-100 rounded-xl shadow-md">
    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 drop-shadow-lg">
      KYOUYAP'S PORTFOLIO
    </h1>
    <p className="text-lg text-gray-700 mb-8">
      kyouyapのポートフォリオです。<br />
      閲覧していただき誠にありがとうございます。
    </p>
  </section>
);

export default Home;
