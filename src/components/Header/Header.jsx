import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./Header.css";

function Header({ onRegisterClick, onLoginClick, onLogout, weatherData }) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="WTWR logo" />
        </Link>
      </div>
      <div className="header__date-location">
        {currentDate}, {weatherData?.city}
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        {currentUser ? (
          <>
            <Link to="/profile" className="header__profile-link">
              {currentUser.name}
            </Link>
            <div className="header__avatar-container">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="User avatar"
                  className="header__avatar-image"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name
                    ? currentUser.name.charAt(0).toUpperCase()
                    : ""}
                </div>
              )}
            </div>
            <button className="header__button-logout" onClick={onLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <button className="header__button-signup" onClick={onRegisterClick}>
              Sign Up
            </button>
            <button className="header__button-login" onClick={onLoginClick}>
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
