import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
//component fetches the profiles data to display it on an individual site.
function ProfilePage() {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile
    fetch(`/api/users/profile/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched user profile:", data); // Debugging
        setUserProfile(data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [username]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <img
            src={require("../images/thumbnail.png")}
            alt="Home"
            style={{ width: "200px", height: "176px"}}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {userProfile ? (
        <div className="w-full md:w-1/3 flex flex-col items-center bg-white shadow-md p-4 rounded-lg">
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
            Avatar
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{userProfile.userName}</p>
            <p className="text-sm text-gray-600">Joined: {userProfile.joinData}</p>
            <p className="bg-purple-200 text-purple-800 text-xs px-3 py-1 rounded-full mt-2">
              {userProfile.tagOfInterest}
            </p>
            <p className="mt-4 text-sm text-gray-700">
              <strong>Chat History:</strong> {userProfile.chatHistory || "No chat history available."}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default ProfilePage;
