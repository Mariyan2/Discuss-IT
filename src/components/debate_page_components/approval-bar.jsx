import React from "react";
import LeftProfilePic from "../../images/LeftProfilePic.jpg";
import RightProfilePic from "../../images/RightProfilePic.jpg";

const ApprovalBar = ({ leftPercentage = 50, rightPercentage = 50 }) => {
  console.log("Approval Bar Updated:", leftPercentage, rightPercentage);

  return (
    <div className="flex items-center w-full space-x-2">
      <img src={LeftProfilePic} alt="Left User" className="w-20 h-20 rounded-full object-cover" />
      <div className="flex h-5 flex-grow bg-gray-300 rounded overflow-hidden">
        <div className="bg-blue-500 transition-all duration-300" style={{ width: `${leftPercentage}%` }}></div>
        <div className="bg-red-500 transition-all duration-300" style={{ width: `${rightPercentage}%` }}></div>
      </div>
      <img src={RightProfilePic} alt="Right User" className="w-20 h-20 rounded-full object-cover" />
    </div>
  );
};

export default ApprovalBar;
