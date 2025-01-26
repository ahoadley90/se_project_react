import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import React from "react";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import "./App.css";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { coordinates, APIkey } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import { getItems, deleteItem } from "../../utils/Api";
import { addItem } from "../../utils/Api";
function App() {
  const [activeModal, setActiveModal] = useState("");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);

  const handleAddItemSubmit = (item) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteClick = (item) => {
    setActiveModal("confirm-delete");
  };

  const handleConfirmDelete = () => {
    if (selectedCard) {
      deleteItem(selectedCard._id)
        .then(() => {
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== selectedCard._id)
          );
          setIsConfirmationModalOpen(false);
          setItemToDelete(null);
          handleCloseModal();
        })
        .catch((err) => console.error("Error deleting item:", err));
    }
  };

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (item) => {
    setSelectedCard(item);
    setActiveModal("preview");
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  const handleAddItemModalSubmit = ({ name, link: imageUrl, weather }) => {
    setClothingItems([
      { name, link: imageUrl, weather, _id: Date.now() },
      ...clothingItems,
    ]);
    handleCloseModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getItems();
        console.log("Data received from API:", items);
        if (Array.isArray(items)) {
          setClothingItems(items);
        } else {
          console.error("Received data is not an array:", items);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  currentTemperatureUnit={currentTemperatureUnit}
                  clothingItems={clothingItems}
                  onDelete={handleDeleteClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onDeleteItem={handleDeleteClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          onClose={handleCloseModal}
          isOpen={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          item={selectedCard}
          onClose={handleCloseModal}
          currentTemperatureUnit={currentTemperatureUnit}
          onDeleteClick={handleDeleteClick}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "confirm-delete"}
          onClose={() => setActiveModal("")}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
