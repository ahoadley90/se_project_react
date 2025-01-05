import React from "react";
import "./Header.css";
import Logo from "../../assets/Logo.svg";
import Avatar from "../../assets/Avatar (2).png";

function Header({ handleAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          <img src={Logo} alt="WTWR Logo" />
        </div>
        <div className="header__info">
          <p className="header__date">{currentDate}, New York</p>
        </div>
      </div>
      <div className="header__right">
        <button className="header__add-clothes-button" onClick={handleAddClick}>
          + Add Clothes
        </button>
        <div className="header__user">
          <p className="header__username">John Doe</p>
          <img className="header__avatar" src={Avatar} alt="User Avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
