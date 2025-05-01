// src/components/NewArrivals.jsx
import React, { useState } from "react";

const initialArrivals = [
  { id: 1, title: "Avengers: Infinity War", info: "Marvel epic" },
  { id: 2, title: "Dune", info: "Sci-fi saga" },
  // ...
];

const NewArrivals = () => {
  const [arrivals, setArrivals] = useState(initialArrivals);
  const [newTitle, setNewTitle] = useState("");
  const [newInfo, setNewInfo] = useState("");

  // Check if admin
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newItem = {
      id: Date.now(),
      title: newTitle,
      info: newInfo,
    };
    setArrivals([...arrivals, newItem]);
    setNewTitle("");
    setNewInfo("");
  };

  const handleDelete = (id) => {
    setArrivals(arrivals.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>New Arrivals</h2>
      <p>Here are the latest additions to our store:</p>

      <ul>
        {arrivals.map(item => (
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
          <h3>Add a New Arrival</h3>
          <input 
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e)=> setNewTitle(e.target.value)}
          />
          <input 
            type="text"
            placeholder="Info"
            value={newInfo}
            onChange={(e)=> setNewInfo(e.target.value)}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
