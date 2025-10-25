import { FaShare } from "react-icons/fa";
import { useState } from "react";

const Handles = () => {
  const [copied, setCopied] = useState(false);
  const [shareToggle, setShareToggle] = useState(false);

  const handleShare = () => {
    const link = window.location.href;
    // Copy to clipboard
    const el = document.createElement("input");
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    // Show popup
    setCopied(true);
    setShareToggle(true);
  };

  return (
    <div className="flex space-x-4 p-2 justify-center items-center bg-gray-100 rounded shadow-md relative">
      {/* Share button */}
      <button
        onClick={handleShare}
        className="flex items-center space-x-1 text-purple-500 hover:text-purple-600"
      >
        <FaShare />
        <span>Share</span>
      </button>

{/* Popup */}
{shareToggle && (
  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <div className="relative bg-white p-10 rounded-2xl shadow-2xl text-center w-[500px] pointer-events-auto">
      {/* close x button */}
      <button
        onClick={() => setShareToggle(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Share this link</h2>

      <input
        type="text"
        value={window.location.href}
        readOnly
        className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-base text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <p className="text-green-600 font-semibold mb-5 text-lg">
        {copied ? "✅ Link copied to clipboard!" : ""}
      </p>
    </div>
  </div>
)}

</div>
  );
};

export default Handles;
