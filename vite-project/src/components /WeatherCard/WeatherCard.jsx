import React from "react";
import "./WeatherCard.css";
import Sunny from "../../assets/sunny.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img
        src="./src/assets/sunny.png"
        alt="Sunny"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
