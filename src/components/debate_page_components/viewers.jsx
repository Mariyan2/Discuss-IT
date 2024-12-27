import React from "react";

const Viewers = () => {
  // Placeholder data for viewers
  const viewers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "User123" },
  ];

  return (
    <div className="border-4 border-gray-300 p-4 mt-4">
      <h3 className="text-lg font-bold Roboto mb-4">Current Viewers</h3>
      <div className="flex flex-wrap gap-4">
        {viewers.map((viewer) => (
          <div
            key={viewer.id}
            className="w-16 h-16 rounded-2xl bg-[rgba(99,157,204,0.38)] flex items-center justify-center text-2xl text-white font-bold Roboto text-shadow-sm"
          >
            {viewer.name[0]}
          </div>
        ))}
      </div>
      <p className="mt-5 font-bold Roboto">
        Total Viewers: <strong>{viewers.length}</strong>
      </p>
    </div>
  );
};

export default Viewers;
