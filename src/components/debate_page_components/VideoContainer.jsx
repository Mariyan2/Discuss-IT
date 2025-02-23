import React, { useEffect, useState } from "react";
import { connect, createLocalVideoTrack } from "twilio-video";

const VideoContainer = ({ roomName }) => {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchTokenAndJoinRoom = async () => {
      try {
        const response = await fetch(`/api/twilio/token/${roomName}`);
        const data = await response.json();
        const token = data.token;

        const videoRoom = await connect(token, {
          name: roomName,
          video: true,
          audio: true,
        });

        setRoom(videoRoom);

        videoRoom.on("participantConnected", (participant) => {
          console.log(`Participant "${participant.identity}" connected`);
        });

      } catch (error) {
        console.error("Error connecting to Twilio Video:", error);
      }
    };

    fetchTokenAndJoinRoom();

    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [roomName]);

  return (
    <div>
      <h3>Video Room: {roomName}</h3>
      <div id="video-container"></div>
    </div>
  );
};

export default VideoContainer;
