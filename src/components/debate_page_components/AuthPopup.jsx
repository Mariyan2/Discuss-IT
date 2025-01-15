import React, { useState } from "react";

const AuthPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleRegister = () => {
    alert("Register");
  };

  const handleLogin = () => {
    alert("Login");
  };

  const handleGuest = () => {
    alert("Continue as Guest");
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setShowPopup(!showPopup)}
        className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
      >
        {showPopup ? "Close" : "Register / Login"}
      </button>

      {showPopup && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg border p-4">
          <h2 className="text-lg font-bold mb-4 text-center">Welcome!</h2>
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleRegister}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Register
            </button>
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={handleGuest}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPopup;
