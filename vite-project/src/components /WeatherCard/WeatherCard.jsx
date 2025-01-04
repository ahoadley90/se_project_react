import React from "react";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <div className="weather-card">
      <h2>{weatherData.temperature}°F</h2>
      <p>{weatherData.description}</p>
    </div>
  );
}

export default WeatherCard;
