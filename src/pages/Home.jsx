import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/debate_page_components/search-bar";
import CreateThread from "../components/debate_page_components/create-thread"; 

const Home = () => {
  const [topics, setTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Category colors
  const categoryColors = {
    anime: "bg-purple-100 text-purple-600",
    science: "bg-blue-100 text-blue-600",
    support: "bg-red-100 text-red-600",
    economy: "bg-yellow-100 text-yellow-600",
    test: "bg-green-100 text-green-600",
    social_media: "bg-gray-100 text-gray-500",
    default: "bg-gray-100 text-gray-500",
  };

  const handleCarouselRightClick = (e) => {
    e.preventDefault();
    setCarouselIndex((prev) => (prev + 1) % Math.min(3, filteredTopics.length));
  };

  // Fetch discussions
  useEffect(() => {
    fetch("/api/discussions")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setTopics(data);
        setFilteredTopics(data);
      })
      .catch((error) => console.error("Error fetching discussions:", error));
  }, []);

  // Filter topics
  useEffect(() => {
    setFilteredTopics(
      topics.filter((topic) =>
        topic.topic.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, topics]);

return (
  <div className="fixed inset-0 bg-gradient-to-b from-[#6c2bb2] to-[#898c8b55] min-h-screen p-8">
    {/* Header */}
    <header className="flex items-center justify-between mb-10">
      <Link to="/">
        <img
          src={require("../images/thumbnail.png")}
          alt="Home"
          className="cursor-pointer w-[180px]"
        />
      </Link>

      {/* Create Discussion here */}
      <div className="flex items-center space-x-4">
        <CreateThread />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
    </header>

    {/* Breaking News */}
    <h1 className="text-center text-3xl font-extrabold text-gray-600 mb-10 tracking-wide">
      BREAKING NEWS!!
    </h1>

    {/* Featured Topics Carousel */}
    <div
      className="flex justify-center items-center mb-10 space-x-6"
      onContextMenu={handleCarouselRightClick}
    >
      {filteredTopics.slice(0, 3).map((topic) => (
        <Link
          key={topic.id}
          to={`/discussion/${topic.id}`}
          className="w-80 h-52 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition duration-200 relative flex flex-col justify-end p-4"
        >
          <div
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
              categoryColors[topic.category?.toLowerCase()] || categoryColors.default
            }`}
          >
            {topic.category}
          </div>

          <h3 className="text-white text-xl font-semibold drop-shadow-sm">
            {topic.topic}
          </h3>

          {/* Viewer bubble */}
          <div className="absolute bottom-3 right-3">
            <div className="relative w-[70px] h-[28px] flex items-center justify-end bg-gradient-to-r from-red-300 to-pink-300 text-red-900 font-semibold text-sm rounded-full shadow-md backdrop-blur-sm px-3">
              <span className="pr-4">{topic.viewers || Math.floor(Math.random() * 3000)}</span>
              <img
                src={require("../images/viewer/viewerEmoji.png")}
                alt="viewers"
                className="w-8 h-8 absolute -top-2 -right-2"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>

    {/* Grid of smaller topics */}
    <div className="grid grid-cols-4 gap-6">
      {filteredTopics.slice(3).map((topic) => (
        <Link
          key={topic.id}
          to={`/discussion/${topic.id}`}
          className="relative h-36 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between p-4"
        >
          <div
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
              categoryColors[topic.category?.toLowerCase()] || categoryColors.default
            }`}
          >
            {topic.category}
          </div>

          <h3 className="mt-6 text-white font-semibold text-lg leading-snug drop-shadow-sm line-clamp-2">
            {topic.topic}
          </h3>

          {/* Viewer bubble */}
          <div className="absolute bottom-3 right-3">
            <div className="relative w-[70px] h-[28px] flex items-center justify-end bg-gradient-to-r from-red-300 to-pink-300 text-red-900 font-semibold text-sm rounded-full shadow-md backdrop-blur-sm px-3">
              <span className="pr-4">{topic.viewers || Math.floor(Math.random() * 300)}</span>
              <img
                src={require("../images/viewer/viewerEmoji.png")}
                alt="viewers"
                className="w-8 h-8 absolute -top-2 -right-2"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

};

export default Home;
