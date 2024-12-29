import React, { useState } from 'react';

// Chat function implemented with placeholders until the backend is set-up

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, newMessage]);
            setNewMessage('');
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Chat Container */}
            <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg p-4">
                <h1 className="text-lg font-bold mb-2 text-blue-600">Chat</h1>
                <div className="h-64 overflow-y-auto border-b border-gray-200 pb-2">
                    {messages.map((msg, index) => (
                        <Chat key={index} chatMessage={msg} />
                    ))}
                </div>
                <div className="flex mt-4">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

const Chat = ({ chatMessage }) => {
    return (
        <div className="mb-2 bg-gray-100 p-2 rounded-lg shadow-sm">
            <p className="text-gray-800">{chatMessage}</p>
        </div>
    );
};

export default ChatApp;
