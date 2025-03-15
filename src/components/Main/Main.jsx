import React, { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

function Main({ weatherData, onSelectCard, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherData.temp?.[currentTemperatureUnit] || 0;

  const weatherType = () => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  };

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType();
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="card__section">
        <div className="card__items">
          Today is {temp}°{currentTemperatureUnit} / You may want to wear:
        </div>
        <div className="card__items-container">
          {filteredCards.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
