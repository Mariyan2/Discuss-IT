import React from "react";
import { Link } from "react-router-dom";
//placeholder page for now
function ProfilePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-6">

<div className="absolute top-4 left-4">
  <Link to="/">
    <img
      src={require("../images/thumbnail.png")}
      alt="Home"
      style={{ width: '146px', height: '126px' }} 
      className="cursor-pointer"
    />
  </Link>
</div>


      <div className="w-full md:w-1/3 flex flex-col items-center bg-white shadow-md p-4 rounded-lg">
        <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
          Avatar
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">Johnn335</p>
          <p className="text-sm text-gray-600">Joined: 2024, November 26</p>
          <p className="bg-purple-200 text-purple-800 text-xs px-3 py-1 rounded-full mt-2">
            Politics
          </p>
        </div>
      </div>


      <div className="w-full md:w-2/3 mt-6 md:mt-0 md:ml-4 bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">History</h2>
        <div className="space-y-4">

          <div className="p-4 bg-gray-200 rounded-lg shadow-sm">
            Do fiscal deficits matter?
          </div>
          <div className="p-4 bg-gray-200 rounded-lg shadow-sm">
            Investment in R&D.
          </div>
          <div className="p-4 bg-gray-200 rounded-lg shadow-sm">
            Benefits of expanding Schengen.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
