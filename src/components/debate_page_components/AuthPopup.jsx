import React, { useState } from "react";
// reguster field 
const AuthPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
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
          userName: userData.user_name, //Map to backend field
          userPassword: userData.user_password, //Map to backend field
          tagOfInterest: userData.tag_of_interest, //Map to backend field
          joinData: new Date().toISOString().split("T")[0], //join date
          chatHistory: "chat history placeholder", //Placeholder for now
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to register user");
          }
          alert("Registration successful!");
        })
        .catch((error) => console.error("Error during registration:", error));
    } else {
      alert("Please fill in all fields!");
    }
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
          <h2 className="text-lg font-bold mb-4 text-center">Register</h2>
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
            <input
              type="text"
              name="tag_of_interest"
              placeholder="Tag of Interest"
              value={userData.tag_of_interest}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleRegister}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPopup;
