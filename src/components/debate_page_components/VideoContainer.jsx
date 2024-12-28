import React, { useEffect, useRef } from "react";

const VideoContainer = () => {
  const jitsiContainer = useRef(null);

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: "YourUniqueRoomName",
      parentNode: jitsiContainer.current,
      width: "100%",
      height: "100%",
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose(); 
  }, []);

  return <div ref={jitsiContainer} style={{ height: "500px", width: "100%" }} />;
};

export default VideoContainer;
