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
}, [roomUrl, callObject]);



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
  <div className="fixed inset-0 bg-gradient-to-b from-[#6c2bb2] to-[#898c8b55] text-white overflow-hidden">
    <div className="min-h-screen p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <Link to="/">
          <img
            src={require("../images/thumbnail.png")}
            alt="Home"
            className="cursor-pointer w-[180px] drop-shadow-md"
          />
        </Link>

        {discussion ? (
          <h1 className="text-3xl font-bold italic text-white/90 drop-shadow-sm">
            {discussion.topic}
          </h1>
        ) : (
          <h1 className="text-3xl italic text-white/70">Loading Discussion...</h1>
        )}
      </header>

      {/* Approval Bar */}
      <div className="flex justify-center mb-12">
        <div className="w-[65%] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-lg">
          {discussion ? (
            <ApprovalBar
              leftPercentage={discussion.leftAgreeRatio}
              rightPercentage={discussion.rightAgreeRatio}
              leftProfilePic={
                discussion.creatorProfilePic ||
                "https://res.cloudinary.com/dynttd3fe/image/upload/v1741538246/iqvksgclnh4cuxlokont.jpg"
              }
              rightProfilePic={
                discussion.opponentProfilePic ||
                "https://res.cloudinary.com/dynttd3fe/image/upload/v1741538246/iqvksgclnh4cuxlokont.jpg"
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

      {/* Main Section */}
      <div className="flex space-x-6 mb-12 justify-center">
        {/* Left (Creator) */}
        <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-md p-6 flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4 italic text-white/90">
            {discussion?.creator || "Waiting..."}
          </h3>
          {callObject ? (
            <CustomVideoContainer callObject={callObject} userType="left" />
          ) : (
            <p className="text-white/60">Loading video...</p>
          )}
          <Handles />
          <button
            className="mt-4 w-[80%] py-2 bg-blue-500/30 border border-blue-300/40 rounded-full 
                       hover:bg-blue-500/40 transition-all shadow-md font-semibold"
            onClick={() => handleVote("creator")}
          >
            Like
          </button>
        </div>

        {/* Right (Opponent) */}
        <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-md p-6 flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4 italic text-white/90">
            {discussion?.opponent || "Waiting for opponent..."}
          </h3>
          {callObject ? (
            <CustomVideoContainer callObject={callObject} userType="right" />
          ) : (
            <p className="text-white/60">Loading video...</p>
          )}
          <Handles />
          <button
            className="mt-4 w-[80%] py-2 bg-red-500/30 border border-red-300/40 rounded-full 
                       hover:bg-red-500/40 transition-all shadow-md font-semibold"
            onClick={() => handleVote("opponent")}
          >
            Like
          </button>
        </div>

        {/* Chat */}
        {discussion ? (
          <ChatApp
            discussionId={discussionId}
            chatMessages={discussion.chat || []}
            loggedInUsername={loggedInUsername}
          />
        ) : (
          <div className="w-[28%] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-md p-6 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4 text-center text-white/80">Live Chat</h3>
            <p className="text-white/70 text-center">Loading chat...</p>
          </div>
        )}
      </div>

      {/* Viewers */}
      <div className="w-[70%] mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-md p-6">
        <Viewers />
      </div>
    </div>
  </div>
);


};

export default Discussion;