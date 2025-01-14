import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/debate_page_components/header";
import Viewers from "../components/debate_page_components/viewers";
import ApprovalBar from "../components/debate_page_components/approval-bar";
import VideoContainer from "../components/debate_page_components/VideoContainer";
import ChatApp from "../components/debate_page_components/chat";
import Handles from "../components/debate_page_components/handles";

const Discussion = () => {
  const { discussionId } = useParams(); // Grab discussionId from route params
  const [discussion, setDiscussion] = useState(null);

  useEffect(() => {
    console.log("Fetched discussionId:", discussionId); // Debugging the discussionId
    fetch(`http://localhost:8080/api/discussions/${discussionId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch discussion data");
        }
        return response.json();
      })
      .then((data) => setDiscussion(data))
      .catch((error) => console.error("Error fetching discussion:", error));
  }, [discussionId]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="p-4">
        <div className="absolute top-4 left-4">
          <Link to="/">
            <img
              src={require("../images/thumbnail.png")}
              alt="Home"
              style={{ width: "146px", height: "126px" }}
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

      <div className="p-4">
        <ApprovalBar percentage={discussion ? discussion.leftAgreeRatio : 0} />
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
          {discussion ? (
            <ChatApp discussionId={discussionId} chatMessages={discussion.chat || []} />
          ) : (
            <p>Loading chat...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discussion;
