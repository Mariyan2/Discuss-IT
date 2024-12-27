import React, { useState } from "react";

const Viewers = () => {
  // Placeholder data for viewers
  const [viewers, setViewers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "User123" },
  ]);

  return (
    <div style={{ border: "4px solid #ccc", padding: "10px", marginTop: "10px" }}>
      <h3>Current Viewers</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {viewers.map((viewer) => (
          <div
            key={viewer.id}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "35%",
              backgroundColor: "#ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            {viewer.name[0]} {
            // Display the first letter of the name 
            }
          </div>
        ))}
      </div>
      <p style={{ marginTop: "20px" }}>
        Total Viewers: <strong>{viewers.length}</strong>
      </p>
    </div>
  );
};

export default Viewers;
