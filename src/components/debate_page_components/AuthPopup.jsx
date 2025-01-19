import React, { useState } from "react";

const AuthPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [userData, setUserData] = useState({
    user_name: "",
    user_password: "",
    tag_of_interest: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = () => {
    if (userData.user_name && userData.user_password && userData.tag_of_interest) {
      fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userData.user_name,
          userPassword: userData.user_password,
          tagOfInterest: userData.tag_of_interest,
          joinData: new Date().toISOString().split("T")[0],
          chatHistory: "chat history placeholder",
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to register user");
          }
          alert("Registration successful!");
          setIsRegisterMode(false); // Switch to login mode after successful registration
        })
        .catch((error) => alert("Error during registration:", error));
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleLogin = () => {
    if (userData.user_name && userData.user_password) {
      fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userData.user_name,
          userPassword: userData.user_password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || "Login failed");
            });
          }
          return response.json();
        })
        .then((data) => {
          alert(data.message);
          setLoggedInUser(data.userName);
          setIsLoggedIn(true);
          setShowPopup(false);
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Please enter both username and password!");
    }
  };
  

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setUserData({
      user_name: "",
      user_password: "",
      tag_of_interest: "",
    });
    alert("Logged out successfully");
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {!isLoggedIn ? (
        <div>
          <button
            onClick={() => setShowPopup(!showPopup)}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
          >
            {showPopup ? "Close" : "Register / Login"}
          </button>
          {showPopup && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg border p-4">
              <h2 className="text-lg font-bold mb-4 text-center">
                {isRegisterMode ? "Register" : "Login"}
              </h2>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Username"
                  value={userData.user_name}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  name="user_password"
                  placeholder="Password"
                  value={userData.user_password}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded"
                />
                {isRegisterMode && (
                  <input
                    type="text"
                    name="tag_of_interest"
                    placeholder="Tag of Interest"
                    value={userData.tag_of_interest}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded"
                  />
                )}
                <button
                  onClick={isRegisterMode ? handleRegister : handleLogin}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  {isRegisterMode ? "Register" : "Login"}
                </button>
                <button
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="w-full px-4 py-2 text-blue-500 underline"
                >
                  Switch to {isRegisterMode ? "Login" : "Register"}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <p className="text-lg font-bold">Welcome, {loggedInUser}!</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthPopup;
