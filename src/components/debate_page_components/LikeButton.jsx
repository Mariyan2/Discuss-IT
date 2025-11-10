
const LikeButton = ({ color, glowColor, onClick }) => {
  return (
    <button
      className={`mt-4 w-[90%] py-4 bg-${color}-500/30 border border-${color}-300/40 rounded-full 
                 hover:bg-${color}-500/40 transition-all shadow-md flex items-center justify-center hover:scale-105`}
      onClick={onClick}
    >
      <img
        src={require("../../images/heart.png")}
        alt="Like"
        className={`w-10 h-10 opacity-90 hover:opacity-100 transition drop-shadow-[0_0_8px_rgba(${glowColor},0.5)]`}
      />
    </button>
  );
};

export default LikeButton;
