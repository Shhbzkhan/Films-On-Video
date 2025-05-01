// src/components/ComingSoon.jsx
import React, { useState } from "react";

// Initial dummy data for coming soon
const initialComingSoon = [
  { id: 1, title: "Guardians of the Galaxy Vol. 3", info: "Marvel cosmic fun" },
  { id: 2, title: "Mission Impossible: Dead Reckoning", info: "Tom Cruise action" },
];

const ComingSoon = () => {
  const [comingSoon, setComingSoon] = useState(initialComingSoon);
  const [newTitle, setNewTitle] = useState("");
  const [newInfo, setNewInfo] = useState("");

  // Check admin
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newItem = {
      id: Date.now(),
      title: newTitle,
      info: newInfo,
    };
    setComingSoon([...comingSoon, newItem]);
    setNewTitle("");
    setNewInfo("");
  };

  const handleDelete = (id) => {
    setComingSoon(comingSoon.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Coming Soon</h2>
      <p>Upcoming releases you won’t want to miss:</p>

      <ul>
        {comingSoon.map(item => (
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
          <h3>Add an Upcoming Title</h3>
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

export default ComingSoon;
