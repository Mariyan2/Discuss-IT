import React, { useState } from "react";

const ChatApp = ({ discussionId, chatMessages }) => {
  const [messages, setMessages] = useState(chatMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const message = {
        user_id: "samepleUserID", 
        message: newMessage,
      };
      fetch(`/api/discussions/${discussionId}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send message");
          }
          setMessages([...messages, message]);
          setNewMessage("");
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="h-full bg-gray-100 p-4 shadow-lg">
      <h1 className="text-lg font-bold mb-4">Chat</h1>
      <div className="flex flex-col h-5/6 overflow-y-auto border border-gray-300 p-2 rounded mb-2">
  {messages.map((msg, index) => (
    <div key={index} className="p-2 bg-gray-200 rounded mb-1">
      <p>
        <strong>{msg.user_id || "Unknown"}:</strong> {msg.message || ":"}
      </p>
    </div>
  ))}
</div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
          className="flex-grow p-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default ChatApp;
