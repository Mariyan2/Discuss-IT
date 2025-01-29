import React from "react";
const ApprovalBar = ({ percentage }) => {
    return (
      <div className="flex h-5 w-full bg-gray-300 rounded overflow-hidden">
      
        <div
          className="bg-blue-200 transition-all duration-300"
          style={{ width: `${percentage}%` }}></div>
        <div
          className="bg-grey-500 transition-all duration-300"
          style={{ width: `${100 - percentage}%` }}></div>
    
      </div>
    );
  };
  


export default ApprovalBar;