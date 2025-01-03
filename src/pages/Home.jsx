import React from "react";
import { Link } from "react-router-dom";

// the topics for now are added manually instead of taken from the database, as the backend will be set-up soon.
const Home = () => {
  const topics = [
    { category: "politics", title: "What's happening in Argentina?", viewers: 355 },
    { category: "gaming", title: "Q & A + League of Legends", viewers: 23 },
    { category: "film", title: "2024 movie release lineup", viewers: 211 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">

      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
    
        </div>
        <input
          type="text"
          placeholder="Search Bar"
          className="p-2 border border-gray-300 rounded w-1/2"
        />
      </header>

      <section className="mb-8">
        <h2 className="text-4xl font-bold text-center mb-4">BREAKING NEWS!!</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-24 bg-gray-300 rounded" />
          <div className="h-24 bg-gray-300 rounded" />
          <div className="h-24 bg-gray-300 rounded" />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-3 gap-4">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow rounded hover:shadow-lg transition"
            >
              <div className="text-sm text-gray-500 mb-2">{topic.category}</div>
              <h3 className="text-lg font-bold mb-2">{topic.title}</h3>
              <div className="text-sm text-gray-500">{topic.viewers} viewers</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-8 text-center">
        <Link
          to="/discussion"
          className="px-6 py-3 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
        >
          Go to Debate Page
        </Link>
      </footer>
    </div>
  );
};

export default Home;
