import React, { useState } from "react";

const CreateThread = ({ onThreadCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

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

      if (!response.ok) {
        throw new Error("Failed to create thread");
      }

      const newThread = await response.json();
      alert("Thread created successfully!");
      setTopic("");
      setCategory("");

      if (onThreadCreated) {
        onThreadCreated(newThread);
      }
      // Automatically reload the page after thread creation
      window.location.reload();
    } catch (error) {
      console.error("Error creating thread:", error);
      alert("Failed to create thread");
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => setShowForm(true)}
      >
        Create Thread
      </button>
    );
  }

  return (
    <div className="relative p-4 bg-white shadow-md rounded w-full max-w-lg mx-auto">
      {/* X Button to close the form */}
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-0 right-2 text-2xl font-bold text-gray-500 hover:text-gray-900"
      >
        x
      </button>
      <h2 className="text-xl font-bold mb-4">Create New Discussion</h2>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Enter Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        onClick={handleCreateThread}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Thread"}
      </button>
    </div>
  );
};

export default CreateThread;
