import React from "react";
import { Link } from "react-router-dom";

const Viewers = () => {
// Placeholder data for viewers, these are manually placed entries representing real users present in the database.
// This is used because the site is currently not live and fetching data from an active database.
  const viewers = [
    { id: 1, name: "John356" },
    { id: 2, name: "Alice123" },
    { id: 3, name: "Bob456" },
    { id: 4, name: "John356" },
    { id: 5, name: "Alice123" },
    { id: 6, name: "Bob456" },
    { id: 7, name: "John356" },
    { id: 8, name: "Alice123" },
    { id: 9, name: "UserBob456" },
    { id: 10, name: "John356" },
    { id: 11, name: "Alice123" },
    { id: 12, name: "Bob456" },
  ];

  return (
    <div className="border-4 border-gray-300 p-4 mt-4">
      <h3 className="text-lg font-bold Roboto mb-4">Current Viewers</h3>
      <div className="flex flex-wrap gap-4">
        {viewers.map((viewer) => (
          <Link
            key={viewer.id}
            to={`/profile/${viewer.name}`} // the profile link is dynamically created using real viewers placed as placeholders.
            className="w-16 h-16 rounded-2xl bg-[rgba(99,157,204,0.38)] flex items-center justify-center text-2xl text-white font-bold Roboto text-shadow-sm hover:bg-blue-500 cursor-pointer transition-colors"
          >
            {viewer.name[0]}
          </Link>
        ))}
      </div>

      <p className="mt-5 font-bold Roboto">
        Total Viewers: <strong>{viewers.length}</strong>
      </p>
    </div>
  );
};

export default Viewers;