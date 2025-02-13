import React from "react";
import { FaShare } from "react-icons/fa";
//handles will be kept to share for now as the like function is being abstracted.
const Handles = () => {
  return (
    <div className="flex space-x-4 p-2 justify-center items-center bg-gray-100 rounded shadow-md">
      <button className="flex items-center space-x-1 text-purple-500 hover:text-purple-600">
        <FaShare />
        <span>Share</span>
      </button>
    </div>
  );
};

export default Handles;
