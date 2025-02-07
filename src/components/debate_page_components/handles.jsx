import React from "react";
import { FaThumbsUp, FaThumbsDown, FaShare } from "react-icons/fa";

const Handles = () => {
  return (
    <div className="flex space-x-4 p-2 justify-center items-center bg-gray-100 rounded shadow-md">

      <button className="flex items-center space-x-1 text-green-500 hover:text-green-600">
        <FaThumbsUp />
        <span>Agree</span>
      </button>

      <button className="flex items-center space-x-1 text-red-500 hover:text-red-600">
        <FaThumbsDown />
        <span>Disagree</span>
      </button>

      <button className="flex items-center space-x-1 text-purple-500 hover:text-purple-600">
        <FaShare />
        <span>Share</span>
      </button>
    </div>
  );
};

export default Handles;
