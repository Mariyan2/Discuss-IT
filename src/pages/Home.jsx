import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/debate_page_components/search-bar";
const Home = () => {
  const [topics, setTopics] = useState([]); // State to store topics from the backend
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search input
  const [filteredTopics, setFilteredTopics] = useState([]); // Filtered topics based on search

  // Fetch discussions from the backend
  useEffect(() => {
    fetch("/api/discussions") // Use relative URL; proxy in package.json will route this
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTopics(data);
        setFilteredTopics(data); // Initialize filtered topics
      })
      .catch((error) => console.error("Error fetching discussions:", error));
  }, []);

  // Update filtered topics based on search query
  useEffect(() => {
    setFilteredTopics(
      topics.filter((topic) =>
        topic.topic.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, topics]);


  
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <header className="flex items-center justify-between mb-8">
        {/* Thumbnail */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={require("../images/thumbnail.png")}
            alt="Home"
            style={{ width: "200px", height: "176px" }}
            className="cursor-pointer"
          />
        </Link>

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>

      <section>
        {filteredTopics.length === 0 ? (
          <p className="text-center text-gray-500">No discussions available.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredTopics.map((topic) => (
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