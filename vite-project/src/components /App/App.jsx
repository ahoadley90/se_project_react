import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isAddClothesModalOpen, setIsAddClothesModalOpen] = useState(false);

  useEffect(() => {
    // Fetch weather data and clothing items here
    // For example:
    // fetchWeatherData().then(data => setWeatherData(data));
    // fetchClothingItems().then(items => setClothingItems(items));
  }, []);

  const handleAddClothes = () => {
    setIsAddClothesModalOpen(true);
  };

  return (
    <div className="app">
      <Header onAddClothes={handleAddClothes} weatherData={weatherData} />
      {weatherData && (
        <Main weatherData={weatherData} clothingItems={clothingItems} />
      )}
      {isAddClothesModalOpen && (
        <div className="modal">
          {/* Add your ModalWithForm component here */}
          <button onClick={() => setIsAddClothesModalOpen(false)}>Close</button>
        </div>
      )}
      <Main />
      <Footer />
    </div>
  );
}

export default App;
