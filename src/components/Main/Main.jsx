import React, { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  clothingItems,
  onSelectCard,
  onCardLike,
  isLoggedIn,
  currentUser,
  onDeleteClick,
  onAddClick,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const getWeatherType = (temp) => {
    if (temp >= 86) return "hot";
    if (temp >= 66 && temp <= 85) return "warm";
    return "cold";
  };

  const temperature = weatherData?.temp?.[currentTemperatureUnit] || 0;
  return (
    <main className="main">
      {weatherData && <WeatherCard weatherData={weatherData} />}
      <section className="card-section">
        <div className="card-section__title">
          Today is {Math.round(temperature)}°{currentTemperatureUnit} / You may
          want to wear:
        </div>
        <div className="card-section__items">
          {clothingItems
            .filter((item) => item.weather === getWeatherType(temperature))
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onSelectCard={onSelectCard}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onDeleteClick={onDeleteClick}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
