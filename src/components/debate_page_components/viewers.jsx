import React from "react";
import { Link } from "react-router-dom";

const Viewers = () => {
  // Placeholder data for viewers
  const viewers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "User123" },
    { id: 4, name: "John Doe" },
    { id: 5, name: "Jane Smith" },
    { id: 6, name: "User123" },
    { id: 7, name: "John Doe" },
    { id: 8, name: "Jane Smith" },
    { id: 9, name: "User123" },
    { id: 10, name: "John Doe" },
    { id: 11, name: "Jane Smith" },
    { id: 12, name: "User123" },
  ];

  return (
    <div className="border-4 border-gray-300 p-4 mt-4">
      <h3 className="text-lg font-bold Roboto mb-4">Current Viewers</h3>
      <div className="flex flex-wrap gap-4">
        {viewers.map((viewer) => (
          <Link
            key={viewer.id}
            to={"/profilePage"} 
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
