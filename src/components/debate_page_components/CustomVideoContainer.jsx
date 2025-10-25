import { useEffect, useRef } from "react";

const CustomVideoContainer = ({ callObject, userType }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!callObject) return;

    const renderTrack = (participant) => {
      const videoTrack = participant.tracks.video?.persistentTrack;
      if (!videoTrack) return;

      const videoEl = document.createElement("video");
      videoEl.srcObject = new MediaStream([videoTrack]);
      videoEl.autoplay = true;
      videoEl.playsInline = true;
      videoEl.style.width = "100%";
      videoEl.style.height = "100%";
      videoEl.style.objectFit = "cover";

      // Decide ;eft or right
      const isLocal = participant.local;
      if ((userType === "left" && isLocal) || (userType === "right" && !isLocal)) {
        videoRef.current.innerHTML = "";
        videoRef.current.appendChild(videoEl);
      }
    };

    callObject.on("joined-meeting", (ev) => renderTrack(ev.participants.local));
    callObject.on("participant-updated", (ev) => renderTrack(ev.participant));

    return () => {
      callObject.off("joined-meeting", renderTrack);
      callObject.off("participant-updated", renderTrack);
    };
  }, [callObject, userType]);

  return (
    <div
      ref={videoRef}
      className={`flex-1 flex justify-center items-center bg-gray-800 rounded-md overflow-hidden ${
        userType === "left" ? "border-blue-500" : "border-red-500"
      }`}
      style={{ height: "500px", borderWidth: "3px" }}
    ></div>
  );
};

export default CustomVideoContainer;
