import { Link } from "react-router-dom";
import ViewerBubble from "./ViewerBubble"; 
// The top discussions presented to the user using a large carousel
const CarouselCard = ({ topic, index, categoryColors }) => {
  const highlight = index === 1; 

  return (
    <Link
      key={topic.id}
      to={`/discussion/${topic.id}`}
      className={`relative flex flex-col justify-between p-6 bg-white/10 backdrop-blur-md 
                  border border-white/20 rounded-3xl shadow-lg transition-transform duration-300
                  ${highlight 
                    ? "w-[400px] h-[260px] scale-110 border-white/30" 
                    : "w-[360px] h-[230px] opacity-85"
                  }`}
    >
      {/* Top Row: Category + Viewers */}
      <div className="flex justify-between items-center">
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            categoryColors[topic.category?.toLowerCase()] || categoryColors.default
          }`}
        >
          {topic.category}
        </div>

        <ViewerBubble count={topic.viewers || Math.floor(Math.random() * 3000)} />
      </div>

      {/* Topic Title */}
      <h3 className="text-white text-xl font-semibold italic drop-shadow-sm text-left">
        {topic.topic}
      </h3>
    </Link>
  );
};

export default CarouselCard;
