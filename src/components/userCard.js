import React from "react";
import "./userCard.css";
function UserCard({user}){
    if(!user){
        return null;
    }
    return (
    <div className="user-card">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
    </div>
    );
}

export default UserCard;