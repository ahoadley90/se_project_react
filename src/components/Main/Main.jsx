import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Main.css";
function Main({
  weatherData,
  onSelectCard,
  clothingItems,
  onCardLike,
  onAddClick,
}) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <ClothesSection
        clothingItems={clothingItems}
        onSelectCard={onSelectCard}
        onCardLike={onCardLike}
        handleAddClick={onAddClick}
      />
    </main>
  );
}

export default Main;
