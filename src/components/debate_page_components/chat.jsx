import React, { useState } from "react";

// Chat function with "Enter" key submission
const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
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
          <Chat key={index} chatMessage={msg} />
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

const Chat = ({ chatMessage }) => {
  return (
    <div className="p-2 bg-gray-200 rounded mb-1">
      <p>{chatMessage}</p>
    </div>
  );
};

export default ChatApp;
