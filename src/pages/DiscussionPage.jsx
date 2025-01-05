import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/debate_page_components/header";
import Viewers from "../components/debate_page_components/viewers";
import ApprovalBar from "../components/debate_page_components/approval-bar";
import VideoContainer from "../components/debate_page_components/VideoContainer";
import ChatApp from "../components/debate_page_components/chat";
import Handles from "../components/debate_page_components/handles";

const Debate = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">



      <div className="p-4">
      <div className="absolute top-4 left-4">
        <Link to="/">
        <img
      src={require("../images/thumbnail.png")} 
      alt="Home"
      className="w-40 h-50 cursor-pointer"
    />
        </Link>
      </div>
        <Header title="What are the economic implications of our high deficit?" />
      </div>

      <div className="p-4">
        <ApprovalBar percentage={35} />
      </div>

      <div className="flex flex-1">
        <div className="flex-1 flex flex-col">
          <VideoContainer />
          <div className="p-4">
            <Handles />
            <Viewers />
          </div>
        </div>

        <div className="w-1/3">
          <ChatApp />
        </div>
      </div>
    </div>
  );
};

export default Debate;
