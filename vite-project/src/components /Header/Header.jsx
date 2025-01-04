import React from "react";
import "./Header.css";

function Header({ onAddClothes }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo">
        <img src="./src/assets/Logo.svg" alt="WTWR Logo" />
      </div>
      <div className="header__info">
        <p className="header__date">{currentDate}</p>
        <p className="header__location">New York</p> {/* Hardcoded for now */}
      </div>
      <button className="header__add-clothes-button" onClick={onAddClothes}>
        + Add Clothes
      </button>
      <div className="header__user">
        <p className="header__username">John Doe</p> {/* Hardcoded for now */}
        <img
          className="header__avatar"
          src="/path-to-avatar.jpg"
          alt="User Avatar"
        />
      </div>
    </header>
  );
}

export default Header;
