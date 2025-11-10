import React from "react";
import { Link } from "react-router-dom";
import ViewerBubble from "./ViewerBubble";

const SmallTopicCards = ({ topic, categoryColors }) => {
  return (
    <Link
      key={topic.id}
      to={`/discussion/${topic.id}`}
      className="relative h-36 bg-white/10 backdrop-blur-md border border-white/20 
                 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] 
                 transition-transform duration-300 flex flex-col justify-between p-4"
    >
      {/* Category Tag */}
      <div
        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
          categoryColors[topic.category?.toLowerCase()] || categoryColors.default
        }`}
      >
        {topic.category}
      </div>

      {/* Topic Title */}
      <h3 className="mt-6 text-white font-semibold text-lg leading-snug drop-shadow-sm line-clamp-2">
        {topic.topic}
      </h3>

      {/* Viewer Bubble */}
      <ViewerBubble count={topic.viewers} />
    </Link>
  );
};

export default SmallTopicCards;
