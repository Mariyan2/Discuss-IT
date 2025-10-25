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
      <div className="flex h-5 flex-grow bg-gray-300 rounded overflow-hidden">
        <div
          className="bg-blue-500 transition-all duration-300"
          style={{ width: `${leftPercentage}%` }}
        />
        <div
          className="bg-red-500 transition-all duration-300"
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