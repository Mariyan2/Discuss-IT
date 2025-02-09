import React, { useState, useEffect, useRef } from "react";

const ChatApp = ({ discussionId, chatMessages }) => {
  const [messages, setMessages] = useState(chatMessages);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  // Get the username from localStorage or set as Anonymous
  const loggedInUsername = localStorage.getItem("username") || "Anonymous";

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const message = {
        username: loggedInUsername, // 🔹 Use stored username
        message: newMessage,
      };

      fetch(`/api/discussions/${discussionId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send message");
          }
          setMessages((prevMessages) => [...prevMessages, message]); // ✅ Update UI
          setNewMessage("");
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  // 🔹 Scroll to the latest message whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-full bg-gray-200 p-4 shadow-lg">
      <h1 className="text-lg font-bold mb-4">Chat</h1>
      <div
        ref={chatContainerRef}
        className="flex flex-col overflow-y-auto"
        style={{ height: "697px" }}
      >
        {messages.map((msg, index) => (
          <div key={index} className="p-2 bg-gray-200 rounded mb-1">
            <p>
              <strong>{msg.username || "Anonymous"}:</strong> {msg.message}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message"
          className="flex-grow p-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default ChatApp;
