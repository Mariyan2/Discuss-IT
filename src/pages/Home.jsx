import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/debate_page_components/search-bar";
import CreateThread from "../components/debate_page_components/create-thread";
import AuthPopup from "../components/debate_page_components/AuthPopup";
import CarouselCard from "../components/debate_page_components/CarouselCard";
import SmallTopicCards from "../components/debate_page_components/SmallTopicCards";

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
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
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
      {/* Carousel Wrapper with side arrows */}
      <div className="relative flex justify-center items-center w-full max-w-[1000px] mx-auto mb-10">
        {/* Left Arrow */}
        <button
          onClick={() =>
            setCarouselIndex((prev) =>
              prev > 0 ? prev - 1 : filteredTopics.length - 3
            )
          }
          className="absolute left-[-150px] top-1/2 -translate-y-1/2 
                  z-10 hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          <img
            src={require("../images/Playbutton.png")}
            alt="Previous"
            className="w-10 h-10 rotate-180 opacity-90 hover:opacity-100 
                    transition filter"
          />
        </button>

        {/* Carousel Cards */}
        <div className="flex justify-center items-center space-x-8">
          {filteredTopics
            .slice(carouselIndex, carouselIndex + 3)
            .map((topic, index) => (
              <CarouselCard
                key={topic.id}
                topic={topic}
                index={index}
                categoryColors={categoryColors}
              />
            ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() =>
            setCarouselIndex((prev) =>
              prev < filteredTopics.length - 3 ? prev + 1 : 0
            )
          }
          className="absolute right-[-150px] top-1/2 -translate-y-1/2 
                  z-10 hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          <img
            src={require("../images/Playbutton.png")}
            alt="Next"
            className="w-10 h-10 opacity-80 hover:opacity-100 transition"
          />
        </button>
      </div>
      {/* Grid of smaller topics */}
      <div className="grid grid-cols-4 gap-6">
        {filteredTopics.slice(3).map((topic) => (
          <SmallTopicCards
            key={topic.id}
            topic={topic}
            categoryColors={categoryColors}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;