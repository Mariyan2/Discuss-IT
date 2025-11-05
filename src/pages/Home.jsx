import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/debate_page_components/search-bar";
import CreateThread from "../components/debate_page_components/create-thread"; 
import AuthPopup from "../components/debate_page_components/AuthPopup";

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
      {/* Left side: Logo + SearchBar */}
      <div className="flex items-center space-x-6">
        <Link to="/">
          <img
            src={require("../images/thumbnail.png")}
            alt="Home"
            className="cursor-pointer w-[180px]"
          />
        </Link>

        {/* Search Bar next to logo */}
        <div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>

      {/* Right side: AuthPopup + Create Discussion */}
      <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full shadow-md">
        {/* AuthPopup handles login/register/logout */}
        <AuthPopup />

        {/* Create Discussion Button */}
        <CreateThread />
      </div>
    </header>



    {/* header */}
<h1 className="text-center text-4xl font-semibold italic text-[#ffffff87] hover:text-[#c27dd0] mb-10 tracking-wide transition-colors duration-300 font-sans">
  Top Discussions
</h1>

{/* Featured Topics Carousel */}
<div className="relative flex flex-col items-center mb-10 w-[55%] mx-auto z-0">
  {/* Title + Arrows */}
{/* Arrows */}
<div className="flex justify-between items-center w-full max-w-[1000px] mb-4">
  {/* Left Arrow */}
  <button
    onClick={() =>
      setCarouselIndex((prev) =>
        prev > 0 ? prev - 1 : filteredTopics.length - 3
      )
    }
    className="w-12 h-12 flex items-center justify-center rounded-full 
               bg-white/10 backdrop-blur-md border border-white/20 
               shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:scale-105 
               hover:bg-white/20 active:scale-95 transition-all duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="white"
      className="w-6 h-6 drop-shadow-md"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  {/* Right Arrow */}
  <button
    onClick={() =>
      setCarouselIndex((prev) =>
        prev < filteredTopics.length - 3 ? prev + 1 : 0
      )
    }
    className="w-12 h-12 flex items-center justify-center rounded-full 
               bg-white/10 backdrop-blur-md border border-white/20 
               shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:scale-105 
               hover:bg-white/20 active:scale-95 transition-all duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="white"
      className="w-6 h-6 drop-shadow-md"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>


  {/* Carousel */}
  <div className="flex justify-center items-center space-x-6 transition-all duration-500 ease-in-out">
    {filteredTopics.slice(carouselIndex, carouselIndex + 3).map((topic) => (
      <Link
        key={topic.id}
        to={`/discussion/${topic.id}`}
        className="w-80 h-52 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 relative flex flex-col justify-between p-4"
      >
        {/* Top Row */}
        <div className="flex justify-between items-center">
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              categoryColors[topic.category?.toLowerCase()] ||
              categoryColors.default
            }`}
          >
            {topic.category}
          </div>

          {/* Viewer Bubble */}
          <div className="relative w-[70px] h-[28px] flex items-center justify-end bg-gradient-to-r from-red-300 to-pink-300 text-red-900 font-semibold text-sm rounded-full shadow-md backdrop-blur-sm px-3">
            <span className="pr-4">
              {topic.viewers || Math.floor(Math.random() * 3000)}
            </span>
            <img
              src={require("../images/viewer/viewerEmoji.png")}
              alt="viewers"
              className="w-8 h-8 absolute -top-2 -right-2"
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-semibold italic drop-shadow-sm text-left">
          {topic.topic}
        </h3>
      </Link>
    ))}
  </div>
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
