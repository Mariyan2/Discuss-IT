import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>
      <Link to="/discussion" className="px-6 py-3 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700">
        Go to Debate Page
      </Link>
    </div>
  );
};

export default Home;
