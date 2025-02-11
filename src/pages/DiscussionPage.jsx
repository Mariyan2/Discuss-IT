import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/debate_page_components/header";
import Viewers from "../components/debate_page_components/viewers";
import ApprovalBar from "../components/debate_page_components/approval-bar";
import VideoContainer from "../components/debate_page_components/VideoContainer";
import ChatApp from "../components/debate_page_components/chat";
import Handles from "../components/debate_page_components/handles";

const Discussion = () => {
  const { discussionId } = useParams();  // Grab discussionId from route params
  const [discussion, setDiscussion] = useState(null);

  // Retrieve logged-in username from localStorage
  const loggedInUsername = localStorage.getItem("username") || "Anonymous";

  useEffect(() => {
    fetch(`http://localhost:8080/api/discussions/${discussionId}`)
      .then((response) => response.json())
      .then((data) => {
        setDiscussion(data);
  
        // If no opponent, auto-join
        if (!data.opponent && data.creator !== loggedInUsername) {
          fetch(`http://localhost:8080/api/discussions/${discussionId}/join`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ opponent: loggedInUsername }),
          })
          .then(response => response.json())
          .then(updatedData => {
            console.log("Opponent joined:", updatedData);
            setDiscussion(updatedData);
          })
          .catch(error => console.error("Error joining discussion:", error));
        }
      })
      .catch(error => console.error("Error fetching discussion:", error));
  }, [discussionId, loggedInUsername]);
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="p-4 relative">
        <div className="absolute top-4 left-4">
          <Link to="/">
            <img
              src={require("../images/thumbnail.png")}
              alt="Home"
              style={{ width: "200px", height: "176px" }}
              className="cursor-pointer"
            />
          </Link>
        </div>
        {discussion ? (
          <Header title={discussion.topic} />
        ) : (
          <h2 className="text-center text-xl">Loading discussion...</h2>
        )}
      </div>

      {/* Approval Bar Section */}
      <div className="flex justify-center p-4">
        <div className="w-2/3">
          {discussion ? <ApprovalBar percentage={discussion.leftAgreeRatio} /> : <ApprovalBar percentage={0} />}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col p-4 space-y-4">
        <div className="flex space-x-4">
          {/* Left Video Container (Creator) */}
          <div className="flex-1 flex flex-col bg-gray-200 rounded p-4">
            <h3 className="text-center font-bold text-2xl mb-4">
              {discussion?.creator || "Waiting..."} 
            </h3> 
            <VideoContainer />
            <div className="mt-4">
              <Handles />
            </div>
          </div>

          {/* Right Video Container (Opponent) */}
          <div className="flex-1 flex flex-col bg-gray-200 rounded p-4">
            <h3 className="text-center font-bold text-2xl mb-4">
              {discussion?.opponent || "Waiting for opponent..."} 
            </h3>
            <VideoContainer />
            <div className="mt-4">
              <Handles />
            </div>
          </div>


          {/* Chat Section */}
          <div className="w-1/3 bg-gray-100 rounded p-4">
            {discussion ? <ChatApp discussionId={discussionId} chatMessages={discussion.chat || []} loggedInUsername={loggedInUsername} /> : <p>Loading chat...</p>}
          </div>
        </div>

        {/* Viewers Section */}
        <div className="bg-gray-200 rounded p-4">
          <Viewers />
        </div>
      </div>
    </div>
  );
};

export default Discussion;
