import React, { useEffect, useRef } from "react";
import DailyIframe from "@daily-co/daily-js";

const VideoContainer = ({ roomUrl }) => {
  const videoRef = useRef(null);
  const callFrameRef = useRef(null); // Store DailyIframe instance globally

  useEffect(() => {
    if (!roomUrl || !videoRef.current) return;

    // Check if an instance already exists
    if (callFrameRef.current) {
      console.log("Destroying existing DailyIframe instance before creating a new one...");
      callFrameRef.current.destroy();
      callFrameRef.current = null;
    }

    if (window.__dailyCallFrame) {
      console.warn("A DailyIframe instance is already running! Skipping new instance creation.");
      return;
    }

    console.log("Creating new DailyIframe instance...");

    try {
      // Create a new instance and store it globally
      callFrameRef.current = DailyIframe.createFrame(videoRef.current, {
        showLeaveButton: true,
      });

      callFrameRef.current.join({ url: roomUrl });

      // Save to global scope to prevent duplicates
      window.__dailyCallFrame = callFrameRef.current;
    } catch (error) {
      console.error("Error creating DailyIframe:", error);
    }

    // Cleanup function to ensure proper destruction
    return () => {
      if (callFrameRef.current) {
        console.log("Cleaning up DailyIframe instance...");
        callFrameRef.current.destroy();
        callFrameRef.current = null;
        window.__dailyCallFrame = null;
      }
    };
  }, [roomUrl]); // Runs only when `roomUrl` changes

  return <div ref={videoRef} style={{ width: "100%", height: "500px" }} />;
};

export default VideoContainer;
