import React from "react";
import "../../css/Profile.css";

export default function Profile() {
  return (
    <div className="Profile">
      <h1>My Profile</h1>
      <div className="profile-card">
        <img src="img/user-avatar.jpg" alt="User Avatar" className="avatar" />
        <h3>John Doe</h3>
        <p>Email: johndoe@example.com</p>
        <button className="edit-profile">Edit Profile</button>
      </div>
    </div>
  );
}
