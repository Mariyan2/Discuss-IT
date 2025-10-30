import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/debate_page_components/header";
import Viewers from "../components/debate_page_components/viewers";
import ApprovalBar from "../components/debate_page_components/approval-bar";
import CustomVideoContainer from "../components/debate_page_components/CustomVideoContainer";
import ChatApp from "../components/debate_page_components/chat";
import Handles from "../components/debate_page_components/handles";
import DailyIframe from "@daily-co/daily-js";

const Discussion = () => {
  const { discussionId } = useParams();  // Grab discussionId from route params
  const [discussion, setDiscussion] = useState(null);
  const [roomUrl, setRoomUrl] = useState(null);
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

  useEffect(() => {
  fetch(`http://localhost:8080/api/daily/get-room/${discussionId}`)
    .then((res) => res.text())
    .then((url) => {
      console.log("Fetched shared room URL:", url);
      setRoomUrl(url);
    })
    .catch((error) =>
      console.error("Error fetching shared Daily room:", error)
    );
}, [discussionId]);

const [callObject, setCallObject] = useState(null);

useEffect(() => {
  if (roomUrl && !callObject) {
    try {
      const instance = DailyIframe.createCallObject({
        subscribeToTracksAutomatically: true,
      });
      setCallObject(instance);

    instance
        .join({ url: roomUrl })
        .then(() => {
          console.log("Joined Daily room");
          instance.startTranscription()
            .then(() => console.log("🎤 Transcription started"))
            .catch((err) => console.error(" Failed to start transcription:", err));
        })
        .catch((err) => {
          console.error(" Error joining Daily room:", err);
        });
    } catch (err) {
      console.error(" Failed to create Daily call object:", err);
    }
  }
  return () => {
    if (callObject) {
      callObject.leave();
      callObject.destroy();
    }
  };
}, [roomUrl]);



const handleVote = (voteFor) => {
  fetch(`http://localhost:8080/api/discussions/${discussionId}/like`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ target: voteFor }),
    credentials: "include",
  })
    .then((response) => response.json())
    .then((updatedData) => {
      console.log("Updated Discussion Data:", updatedData);

      if (!updatedData.creator || !updatedData.opponent) {
        console.error("Invalid response data:", updatedData);
        return;
      }

      setDiscussion({ ...updatedData });
    })
    .catch((error) => console.error("Error liking discussion:", error));
};
  
  

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
    {discussion ? (
     <ApprovalBar
     leftPercentage={discussion.leftAgreeRatio}
     rightPercentage={discussion.rightAgreeRatio}
     leftProfilePic={
       discussion.creatorProfilePic
         ? discussion.creatorProfilePic
         : "https://res.cloudinary.com/dynttd3fe/image/upload/v1741538246/iqvksgclnh4cuxlokont.jpg"
     }
     rightProfilePic={
       discussion.opponentProfilePic
         ? discussion.opponentProfilePic
         : "https://res.cloudinary.com/dynttd3fe/image/upload/v1741538246/iqvksgclnh4cuxlokont.jpg"
     }
   />
       ) : (
      <ApprovalBar
        leftPercentage={50}
        rightPercentage={50}
        leftProfilePic="https://res.cloudinary.com/dynttd3fe/image/upload/v1741538246/iqvksgclnh4cuxlokont.jpg"
        rightProfilePic="https://res.cloudinary.com/dynttd3fe/image/upload/v1741538246/iqvksgclnh4cuxlokont.jpg"
      />
    )}
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
            {callObject ? <CustomVideoContainer callObject={callObject} userType="left" /> : <p>Loading video...</p>}
            <div className="mt-4">
              <Handles />
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleVote("creator")}
            >
              👍 Like
            </button>
          </div>

          {/* Right Video Container (Opponent) */}
          <div className="flex-1 flex flex-col bg-gray-200 rounded p-4">
            <h3 className="text-center font-bold text-2xl mb-4">
              {discussion?.opponent || "Waiting for opponent..."}
            </h3>
            {callObject ? <CustomVideoContainer callObject={callObject} userType="right" /> : <p>Loading video...</p>}
            <div className="mt-4">
              <Handles />
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleVote("opponent")}
            >
              👍 Like
            </button>
          </div>

          {/* Chat Section */}
          <div className="w-1/3 bg-gray-100 rounded p-4">
            {discussion ? (
              <ChatApp
                discussionId={discussionId}
                chatMessages={discussion.chat || []}
                loggedInUsername={loggedInUsername}
              />
            ) : (
              <p>Loading chat...</p>
            )}
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