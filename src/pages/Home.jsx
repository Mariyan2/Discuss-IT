import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [topics, setTopics] = useState([]); // State to store topics from the backend

  // Fetch discussions from the backend
  useEffect(() => {
    fetch("/api/discussions") // Use relative URL; proxy in package.json will route this
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setTopics(data)) // Update the topics state with the fetched data
      .catch((error) => console.error("Error fetching discussions:", error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <img
            src={require("../images/thumbnail.png")}
            alt="Home"
            style={{ width: "146px", height: "126px" }}
            className="cursor-pointer"
          />
        </Link>
      </div>

      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4"></div>
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
        {topics.length === 0 ? (
          <p className="text-center text-gray-500">No discussions available.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                to={`/discussion/${topic.id}`}
                className="cursor-pointer bg-white p-4 shadow rounded hover:shadow-lg transition"
              >
                <div className="text-sm text-gray-500 mb-2">{topic.category}</div>
                <h3 className="text-lg font-bold">{topic.topic}</h3>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
