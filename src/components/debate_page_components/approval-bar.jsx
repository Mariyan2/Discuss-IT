//constructs the approval bar with default values set to 50 so the bar is equal on both sides in the beginning
const ApprovalBar = ({
  leftPercentage = 50,
  rightPercentage = 50,
  leftProfilePic,
  rightProfilePic
}) => {
  console.log("Approval Bar Updated:", leftPercentage, rightPercentage);

  return (
    <div className="flex items-center w-full space-x-2">
      <img
        src={leftProfilePic}
        alt="Left User"
        className="w-20 h-20 rounded-full object-cover"
      />
      <div className="relative flex w-full h-6 rounded-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
        <div
          className="bg-gradient-to-r from-blue-400/60 to-blue-500/50 backdrop-blur-sm transition-all duration-500 ease-in-out"
          style={{ width: `${leftPercentage}%` }}
        />
        <div
          className="bg-gradient-to-r from-red-400/50 to-red-500/50 backdrop-blur-sm transition-all duration-500 ease-in-out"
          style={{ width: `${rightPercentage}%` }}
        />
      </div>
      <img
        src={rightProfilePic}
        alt="Right User"
        className="w-20 h-20 rounded-full object-cover"
      />
    </div>
  );
};

export default ApprovalBar;