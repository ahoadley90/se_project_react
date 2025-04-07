import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./Header.css";

function Header({
  onRegisterClick,
  onLoginClick,
  weatherData,
  onAddNewClick,
  onEditProfile,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="WTWR logo" />
          </Link>
        </div>
        <div className="header__date-location">
          <p className="header__date">
            {currentDate}, {weatherData?.city}
          </p>
        </div>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        {currentUser ? (
          <div className="header__user">
            <button className="header__button-add" onClick={onAddNewClick}>
              + Add clothes
            </button>
            <Link to="/profile" className="header__profile-link">
              <p className="header__username">{currentUser.name}</p>
            </Link>
            <div className="header__avatar" onClick={onEditProfile}>
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
          </div>
        ) : (
          <div className="header__auth-buttons">
            <button className="header__button-signup" onClick={onRegisterClick}>
              Sign Up
            </button>
            <button className="header__button-login" onClick={onLoginClick}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
