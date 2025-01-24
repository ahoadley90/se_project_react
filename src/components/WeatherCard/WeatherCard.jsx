import React from "react";
import "./WeatherCard.css";
import { weatherOptions } from "./../../utils/constants";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  const weatherOptionUrl = filteredOptions[0]?.url || "";
  const weatherOptionCondition =
    filteredOptions[0]?.condition || weatherData.condition;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}&deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOptionUrl}
        alt={weatherOptionCondition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
