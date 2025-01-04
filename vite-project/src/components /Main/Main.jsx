import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ weatherData, clothingItems }) {
  // Function to filter clothing items based on weather
  const filterClothingItems = () => {
    // Implement your filtering logic here
    // For example:
    const temperature = weatherData.temperature;
    return clothingItems.filter((item) => {
      if (temperature >= 86) return item.weather === "hot";
      if (temperature >= 66 && temperature <= 85)
        return item.weather === "warm";
      if (temperature <= 65) return item.weather === "cold";
    });
  };

  const filteredClothingItems = filterClothingItems();

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="card-section">
        <ul className="card-list">
          {filteredClothingItems.map((item) => (
            <li key={item.id}>
              <ItemCard item={item} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
