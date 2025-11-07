import { useEffect, useState } from "react";

const LiveSubtitles = ({ callObject }) => {
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (!callObject) return;

    // Listen for Daily transcription events
    const handleTranscriptionStarted = (ev) => {
      console.log("Transcription started:", ev);
    };

    const handleTranscriptionMessage = (ev) => {
      // ev has structure like:
      // { participant: { user_id, user_name }, text, is_final }
      setCaption(ev.text);
    };

    const handleTranscriptionStopped = () => {
      console.log("Transcription stopped");
      setCaption("");
    };

    callObject.on("transcription-started", handleTranscriptionStarted);
    callObject.on("transcription-message", handleTranscriptionMessage);
    callObject.on("transcription-stopped", handleTranscriptionStopped);

    // cleanup on unmount
    return () => {
      callObject.off("transcription-started", handleTranscriptionStarted);
      callObject.off("transcription-message", handleTranscriptionMessage);
      callObject.off("transcription-stopped", handleTranscriptionStopped);
    };
  }, [callObject]);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-lg px-6 py-3 rounded-xl backdrop-blur-md border border-white/20 shadow-lg w-[70%] text-center">
      {caption || "Listening..."}
    </div>
  );
};

export default LiveSubtitles;
