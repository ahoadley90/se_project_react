import React from "react";
import "./SideBar.css";
import AvatarImage from "../../assets/Avatar (2).png";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={AvatarImage} alt="Default avatar" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default SideBar;
