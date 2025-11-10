import { useEffect, useRef, useState } from "react";

const LiveSubtitles = ({ callObject }) => {
  const [caption, setCaption] = useState("");
  const [translated, setTranslated] = useState("");
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!callObject) return;

    const handleTranscriptionStarted = (ev) => {
      console.log("Transcription started:", ev);
    };

    const handleTranscriptionMessage = async (ev) => {
      setCaption(ev.text);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      const text = ev.text;
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/api/translate/en-bg?text=${encodeURIComponent(text)}`
          );
          if (!res.ok) throw new Error("Translation request failed");
          const translatedText = await res.text();
          setTranslated(translatedText || "");
        } catch (error) {
          console.error("Translation error:", error);
        }
      }, 250);
    };

    const handleTranscriptionStopped = () => {
      console.log("Transcription stopped");
      setCaption("");
      setTranslated("");
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };

    callObject.on("transcription-started", handleTranscriptionStarted);
    callObject.on("transcription-message", handleTranscriptionMessage);
    callObject.on("transcription-stopped", handleTranscriptionStopped);

    return () => {
      callObject.off("transcription-started", handleTranscriptionStarted);
      callObject.off("transcription-message", handleTranscriptionMessage);
      callObject.off("transcription-stopped", handleTranscriptionStopped);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [callObject]);

  return (
    <div className="fixed bottom-1/4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-lg px-6 py-3 rounded-xl backdrop-blur-md border border-white/20 shadow-lg w-[70%] text-center">
      {caption ? (
        <>
          <p className="text-white/70 italic">{caption}</p>
          {translated && (
            <p className="text-white font-semibold mt-1">{translated}</p>
          )}
        </>
      ) : (
        "Listening..."
      )}
    </div>
  );
};

export default LiveSubtitles;
