import React from "react";
import LeftProfilePic from "../../images/LeftProfilePic.jpg";
import RightProfilePic from "../../images/RightProfilePic.jpg";
const ApprovalBar = ({ percentage }) => {
  return (
    <div className="flex items-center w-full space-x-2">
      {/* Placeholder profile pictures for now, they project will use AWS bucket where the images will be stored.*/}

      <img
        src={LeftProfilePic}
        alt="Left User"
        className="w-20 h-20 rounded-full object-cover"
      />

      <div className="flex h-5 flex-grow bg-gray-300 rounded overflow-hidden">
        <div
     className="bg-blue-200 transition-all duration-300" 
     style={{ width: `${percentage}%` }}
        ></div>
        <div
          className="bg-gray-500 transition-all duration-300"
          style={{ width: `${100 - percentage}%` }}
        ></div>
      </div>

      <img
        src={RightProfilePic}
        alt="Right User"
        className="w-20 h-20 rounded-full object-cover"
      />
    </div>
  );
};

export default ApprovalBar;
