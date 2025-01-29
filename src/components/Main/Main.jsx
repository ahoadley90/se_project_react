import React, { useContext } from "react";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, onDelete }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temp[currentTemperatureUnit];

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {temperature}&deg; {currentTemperatureUnit} / You may want to
          wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter(
              (item) => weatherData.type && item.weather === weatherData.type
            )
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onDelete={onDelete}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
