import React from "react";
import "./WeatherCard.css";
import { weatherOptions } from "./../../utils/constants";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  const defaultOption = weatherOptions.find(
    (option) => option.day === weatherData.isDay && option.condition === "storm"
  );
  const weatherOptionUrl = filteredOptions[0]?.url || defaultOption.url;
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
