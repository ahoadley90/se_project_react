import React from "react";
import "./Header.css";
import Logo from "../../assets/Logo.svg";
import Avatar from "../../assets/Avatar (2).png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          <Link to="/">
            <img src={Logo} alt="WTWR Logo" />
          </Link>
        </div>
        <div className="header__info">
          <p className="header__date">
            {currentDate}, {weatherData.city}
          </p>
        </div>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <button className="header__add-clothes-button" onClick={handleAddClick}>
          + Add Clothes
        </button>
        <Link to="/profile" className="header__profile-link">
          <div className="header__user">
            <p className="header__username">John Doe</p>
            <img className="header__avatar" src={Avatar} alt="User Avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
