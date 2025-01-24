import { useState, useEffect } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import React from "react";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./App.css";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { coordinates, APIkey } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [selectedCard, setSelectedCard] = useState({});

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (item) => {
    setActiveModal("preview");
    setSelectedCard(item);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
        setCurrentTemperatureUnit,
      }}
    >
      <div className="app">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            currentTemperatureUnit={currentTemperatureUnit}
          />
          <Footer />
        </div>
        <ModalWithForm
          title="New garment"
          buttonText={
            <>
              <span>Add</span>
              <span>Garment</span>
            </>
          }
          isOpen={activeModal === "add-garment"}
          onClose={handleCloseModal}
        >
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
              required
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
              required
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="hot"
                name="weather"
                value="hot"
              />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="warm"
                name="weather"
                value="warm"
              />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="cold"
                name="weather"
                value="cold"
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          item={selectedCard}
          onClose={handleCloseModal}
          currentTemperatureUnit={currentTemperatureUnit}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
