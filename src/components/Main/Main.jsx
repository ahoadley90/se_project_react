import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

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
  const getWeatherType = (temp) => {
    if (temp >= 86) return "hot";
    if (temp >= 66 && temp <= 85) return "warm";
    return "cold";
  };
  return (
    <main className="main">
      {weatherData && <WeatherCard WeatherCard weatherData={weatherData} />}
      <section className="card-section">
        <div className="card-section__title">
          Today is {weatherData && Math.round(weatherData.temp.F)}°F / You may
          want to wear:
        </div>
        <div className="card-section__items">
          {clothingItems
            .filter(
              (item) => item.weather === getWeatherType(weatherData?.temp.F)
            )
            .map((item) => (
              <ItemCard
                key={`${item._id}-${item.likes ? item.likes.length : 0}`}
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
