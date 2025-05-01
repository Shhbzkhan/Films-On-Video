// src/components/StaffPicks.jsx
import React, { useState } from "react";

// Initial dummy data for staff picks
const initialStaffPicks = [
  { id: 1, title: "The Godfather", info: "Classic crime drama" },
  { id: 2, title: "Spirited Away", info: "Beautiful animation by Studio Ghibli" },
];

const StaffPicks = () => {
  const [picks, setPicks] = useState(initialStaffPicks);
  const [newTitle, setNewTitle] = useState("");
  const [newInfo, setNewInfo] = useState("");

  // Simple admin check (using localStorage from Login)
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newItem = {
      id: Date.now(),
      title: newTitle,
      info: newInfo,
    };
    setPicks([...picks, newItem]);
    setNewTitle("");
    setNewInfo("");
  };

  const handleDelete = (id) => {
    setPicks(picks.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Staff Picks</h2>
      <p>Our employees’ top recommendations this month:</p>

      <ul>
        {picks.map(item => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            <strong>{item.title}</strong> - {item.info}
            {isAdmin && (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      {isAdmin && (
        <div style={{ marginTop: "20px" }}>
          <h3>Add a Staff Pick</h3>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ marginRight: "8px" }}
          />
          <input
            type="text"
            placeholder="Info"
            value={newInfo}
            onChange={(e) => setNewInfo(e.target.value)}
            style={{ marginRight: "8px" }}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      )}
    </div>
  );
};

export default StaffPicks;
