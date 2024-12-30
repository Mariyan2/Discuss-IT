import React from "react";
import { FaThumbsUp, FaThumbsDown, FaMicrophone, FaMicrophoneSlash, FaShare, FaVideo, FaVideoSlash } from "react-icons/fa";

const Handles = () => {
  return (
    <div className="flex space-x-4 p-2 justify-center items-center bg-gray-100 rounded shadow-md">

      <button className="flex items-center space-x-1 text-green-500 hover:text-green-600">
        <FaThumbsUp />
        <span>Like</span>
      </button>

      <button className="flex items-center space-x-1 text-red-500 hover:text-red-600">
        <FaThumbsDown />
        <span>Dislike</span>
      </button>

      <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600">
        <FaMicrophone />
        <span>Mute</span>
      </button>

      <button className="flex items-center space-x-1 text-purple-500 hover:text-purple-600">
        <FaShare />
        <span>Share</span>
      </button>

      <button className="flex items-center space-x-1 text-orange-500 hover:text-orange-600">
        <FaVideo />
        <span>Video</span>
      </button>
    </div>
  );
};

export default Handles;
