import  { useState, useEffect } from "react";

//AuthPopup handles the user login / register
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
  
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setLoggedInUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = () => {
    if (userData.user_name && userData.user_password && userData.tag_of_interest) {
      fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          setIsRegisterMode(false); 
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
        headers: { "Content-Type": "application/json" },
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
          localStorage.setItem("username", data.userName); 
          setShowPopup(false);
          console.log("Stored Username in localStorage:", localStorage.getItem("username")); // Debugging
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Please enter both username and password!");
    }
  }

return (
  <div>
    {!isLoggedIn ? (
      <div>
        <button
          onClick={() => setShowPopup(!showPopup)}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
        >
          {showPopup ? "Close" : "Register / Login"}
        </button>

        {showPopup && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[99990]"
              onClick={() => setShowPopup(false)}
            ></div>

            {/* Popup */}
            <div className="fixed top-24 right-10 w-72 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-5 z-[99999]">
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
          </>
        )}
      </div>
    ) : (
      <p className="text-lg font-bold text-white">
        {loggedInUser}
      </p>
    )}
  </div>
);

};

export const logoutUser = () => {
  localStorage.removeItem("username");
  alert("Logged out successfully");
  window.location.reload();
};

export default AuthPopup;