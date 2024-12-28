import React from "react";
const ApprovalBar = ({ percentage }) => {
    return (
      <div className="flex h-5 w-full bg-gray-300 rounded overflow-hidden">
      
        <div
          className="bg-green-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}></div>
        <div
          className="bg-red-500 transition-all duration-300"
          style={{ width: `${100 - percentage}%` }}></div>
    
      </div>
    );
  };
  


export default ApprovalBar;