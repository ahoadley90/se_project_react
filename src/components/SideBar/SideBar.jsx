import React, { useContext } from "react";
import "./SideBar.css";
import AvatarImage from "../../assets/Avatar (2).png";
import CurrentUserContext from "../../context/CurrentUserContext";

function SideBar({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img src={AvatarImage} alt="User avatar" className="sidebar__avatar" />
        <p className="sidebar__username">{currentUser?.name}</p>
        <p className="sidebar__email">{currentUser?.email}</p>
      </div>
      <button className="sidebar__signout-button" onClick={onSignOut}>
        Sign out
      </button>
    </div>
  );
}

export default SideBar;
