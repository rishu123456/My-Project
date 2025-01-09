import React, { useState, useEffect } from "react";
import UserCard from "./userCard";
import "./userCardGrid.css";

function UserCardGrid() {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data); // Set the fetched data to users
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false)); // Turn off loading state
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  return (
    <div className="user-grid">
      {users.map((us) => (
        <UserCard key={us.id} user={us} />
      ))}
    </div>
  );
}

export default UserCardGrid;
