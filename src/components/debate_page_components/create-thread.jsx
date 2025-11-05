import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./AuthPopup";

const CreateThread = ({ onThreadCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  if (!username) return null;

  const handleCreateThread = async () => {
    if (!topic.trim() || !category.trim()) {
      alert("Please enter both topic and category!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ topic, category }),
      });
      if (!response.ok) throw new Error("Failed to create thread");
      const newThread = await response.json();
      setTopic("");
      setCategory("");
      if (onThreadCreated) onThreadCreated(newThread);
      navigate(`/discussion/${newThread.id}`);
    } catch (error) {
      console.error("Error creating thread:", error);
      alert("Failed to create thread");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-end">
      {/* Logout and Create Discussion */}
      <div className="flex">
        <button
        onClick={logoutUser}

          className="w-40 py-2 bg-red-500/30 backdrop-blur-md border border-red-300/40 
                     text-white font-semibold rounded-l-full shadow-[0_4px_12px_rgba(0,0,0,0.2)] 
                     hover:bg-red-500/40 hover:shadow-[0_0_15px_rgba(255,100,100,0.4)] 
                     transition-all duration-300"
        >
          Logout
        </button>

        <button
          className="w-40 py-2 bg-green-500/30 backdrop-blur-md border border-green-300/40 
                     text-white font-semibold rounded-r-full shadow-[0_4px_12px_rgba(0,0,0,0.2)] 
                     hover:bg-green-500/40 hover:shadow-[0_0_15px_rgba(100,255,100,0.4)] 
                     transition-all duration-300"
          onClick={() => setShowForm(!showForm)}
        >
          Create Discussion
        </button>
      </div>

      {/* Expanding form */}
      <div
        className={`absolute right-0 top-full mt-6 w-[410px]  /* match header width */
                    p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md 
                    shadow-[0_8px_25px_rgba(0,0,0,0.25)] text-white transform origin-top
                    transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${showForm ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-4 pointer-events-none"}`}
      >
        <input
          type="text"
          className="w-full p-3 mb-3 rounded-lg bg-white/20 border border-gray-300/40 
                     placeholder-white/70 text-white focus:outline-none focus:ring-2 
                     focus:ring-green-300/50 transition"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <input
          type="text"
          className="w-full p-3 mb-5 rounded-lg bg-white/20 border border-gray-300/40 
                     placeholder-white/70 text-white focus:outline-none focus:ring-2 
                     focus:ring-green-300/50 transition"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            className="px-6 py-2 bg-blue-500/30 backdrop-blur-md border border-blue-300/40 
                       text-white font-semibold rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)] 
                       hover:bg-blue-500/40 hover:shadow-[0_0_15px_rgba(100,180,255,0.4)] 
                       transition-all duration-300 disabled:opacity-50"
            onClick={handleCreateThread}
            disabled={loading}
          >
            {loading ? "Creating..." : "Submit"}
          </button>

          <button
            className="px-6 py-2 bg-gray-500/30 backdrop-blur-md border border-gray-300/40 
                       text-white font-semibold rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)] 
                       hover:bg-gray-500/40 hover:shadow-[0_0_15px_rgba(200,200,200,0.4)] 
                       transition-all duration-300"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateThread;
