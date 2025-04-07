import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getWeather } from "../../utils/weatherApi";
import {
  getItems,
  deleteItem,
  addItem,
  addCardLike,
  removeCardLike,
  updateUserProfile,
} from "../../utils/api.js";

import { signin, signup, checkToken } from "../../utils/auth";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../context/CurrentUserContext";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants.js";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const getUserInfo = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Error checking token:", err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  useEffect(() => {
    console.log("Fetching items...");
    if (isLoggedIn) {
      getItems()
        .then((items) => {
          console.log("Fetched items:", items);
          if (items.length === 0) {
            setClothingItems(defaultClothingItems);
          } else {
            setClothingItems(items);
          }
        })
        .catch((error) => {
          console.error("Error fetching clothing items:", error);
          setClothingItems(defaultClothingItems);
        });
    } else {
      console.log("User not logged in, using default items");
      setClothingItems(defaultClothingItems);
    }
  }, [isLoggedIn]);

  const handleCardClick = (item) => {
    console.log("Card clicked:", item);
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

  const handleAddItemSubmit = (item) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteClick = () => {
    console.log("Delete button clicked, selectedCard:", selectedCard);
    setActiveModal("confirm-delete");
  };

  const handleConfirmDelete = () => {
    console.log("Confirming delete for item:", selectedCard);
    if (selectedCard && selectedCard._id) {
      deleteItem(selectedCard._id)
        .then(() => {
          console.log("Item deleted successfully");
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== selectedCard._id)
          );
          handleCloseModal();
        })
        .catch((err) => console.error("Error deleting item:", err));
    } else {
      console.error("No item selected for deletion");
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleRegister = (userData) => {
    signup(userData)
      .then((res) => {
        if (res) {
          handleLogin(userData);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          getUserInfo();
          getItems()
            .then((items) => setClothingItems(items))
            .catch((err) =>
              console.error("Error fetching items after login:", err)
            );
          handleCloseModal();
        }
      })
      .catch((err) => console.error(err));
  };

  const handleLoginModalOpen = () => {
    setActiveModal("login");
  };

  const handleRegisterModalOpen = () => {
    setActiveModal("register");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleCardLike = (item) => {
    const token = localStorage.getItem("jwt");
    const isLiked =
      item.likes && item.likes.some((id) => id === currentUser._id);

    (isLiked ? removeCardLike : addCardLike)(item._id, token)
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((i) => (i._id === updatedCard._id ? updatedCard : i))
        );
      })
      .catch((err) => {
        console.error("Error updating like:", err);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <Header
            isLoggedIn={isLoggedIn}
            onRegisterClick={() => setActiveModal("register")}
            onLoginClick={() => setActiveModal("login")}
            onLogout={handleLogout}
            onAddClick={handleAddClick}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onSelectCard={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                  onAddClick={handleAddClick}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onDeleteClick={handleDeleteClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onSelectCard={handleCardClick}
                  onAddClick={handleAddClick}
                  onSignOut={handleLogout}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
          <Footer />
          {activeModal === "add-garment" && (
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItemSubmit}
              onClose={handleCloseModal}
            />
          )}
          {activeModal === "preview" && selectedCard && (
            <ItemModal
              activeModal={activeModal}
              item={selectedCard}
              onClose={handleCloseModal}
              onDelete={handleDeleteClick}
            />
          )}
          {activeModal === "confirm-delete" && (
            <DeleteConfirmationModal
              isOpen={activeModal === "confirm-delete"}
              onClose={handleCloseModal}
              onConfirm={handleConfirmDelete}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={handleCloseModal}
              onRegister={handleRegister}
              onLoginClick={handleLoginModalOpen}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={handleCloseModal}
              onLogin={handleLogin}
              onRegisterClick={handleRegisterModalOpen}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
