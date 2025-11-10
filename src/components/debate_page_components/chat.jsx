import  { useState, useEffect, useRef } from "react";

//Live stream chat
const ChatApp = ({ discussionId, chatMessages }) => {
  const [messages, setMessages] = useState(chatMessages);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  // Get the username from localStorage or set as Anonymous
  const loggedInUsername = localStorage.getItem("username") || "Anonymous";

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const message = {
        username: loggedInUsername,
        message: newMessage,
      };
  
      fetch(`/api/discussions/${discussionId}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for session-based authentication
        body: JSON.stringify(message),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorMessage = await response.text(); // Get error message
            throw new Error(errorMessage || "Failed to send message");
          }
  
          // Check if response has content before parsing
          return response.headers.get("content-length") === "0" ? {} : response.json();
        })
        .then((data) => {
          console.log("Message sent:", data);
          setMessages((prevMessages) => [...prevMessages, message]);
          setNewMessage("");
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };
  

  // Scroll to the latest message whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
  <div className="w-[28%] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-md p-6 flex flex-col">
    <h3 className="text-2xl font-semibold mb-4 text-center text-white">Stream Chat</h3>

    <div
      ref={chatContainerRef}
      className="flex flex-col overflow-y-auto space-y-2 mb-4"
      style={{ height: "600px" }}
    >
      {messages.map((msg, index) => (
        <div key={index} className="p-2 bg-white/20 backdrop-blur-sm rounded">
          <p className="text-black text-xl">
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
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="flex-grow p-2 bg-white/20 border border-white/30 text-white text-xl placeholder-white/60 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
    </div>
  </div>
);

};

export default ChatApp;
