//Bubble indicating current viewership (currently uses placeholder values)
const ViewerBubble = ({ count }) => {
  return (
    <div className="absolute bottom-3 right-3">
      <div className="relative w-[70px] h-[28px] flex items-center justify-end 
                      bg-gradient-to-r from-red-300 to-pink-300 text-red-900 
                      font-semibold text-sm rounded-full shadow-md 
                      backdrop-blur-sm px-3">
        <span className="pr-4">{count || Math.floor(Math.random() * 300)}</span>
        <img
          src={require("../../images/viewer/viewerEmoji.png")}
          alt="viewers"
          className="w-8 h-8 absolute -top-2 -right-2"
        />
      </div>
    </div>
  );
};

export default ViewerBubble;
