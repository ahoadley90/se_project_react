import React from "react";
import "./SideBar.css";

function SideBar({ onSignOut, onEditProfile, currentUser }) {
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {currentUser.avatar && (
          <img
            src={currentUser.avatar}
            alt="User avatar"
            className="sidebar__avatar"
          />
        )}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <nav className="sidebar__nav">
        <button className="sidebar__button" onClick={onEditProfile}>
          Change profile data
        </button>
        <button className="sidebar__button" onClick={onSignOut}>
          Log out
        </button>
      </nav>
    </div>
  );
}

export default SideBar;
