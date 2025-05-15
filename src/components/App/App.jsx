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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getWeather } from "../../utils/weatherApi";
import {
  getItems,
  deleteItem,
  addItem,
  addCardLike,
  removeCardLike,
  updateUserProfile,
} from "../../utils/Api.js";

import { signin, signup, checkToken } from "../../utils/auth";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../context/CurrentUserContext";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants.js";
import { pingServer } from "../../utils/Api.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

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
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleUpdateUser = (userData) => {
    const token = localStorage.getItem("jwt");
    updateUserProfile(token, userData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllModals();
      })
      .catch((err) => console.log(err));
  };

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
          setClothingItems(items);
        })
        .catch((error) => {
          console.error("Error fetching clothing items:", error);
          setError("Failed to fetch items. Please try again later.");
          setClothingItems([]);
        });
    } else {
      console.log("User not logged in, no items to display");
      setClothingItems([]);
    }
  }, [isLoggedIn]);

  const handleCardClick = (item) => {
    console.log("Card clicked:", item);
    setSelectedCard(item);
    setActiveModal("preview");
    console.log("Active modal set to:", "preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard({});
    setIsEditProfileModalOpen(false);
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
      if (isLoggedIn) {
        setIsLoading(true);
        deleteItem(selectedCard._id)
          .then(() => {
            console.log("Item deleted successfully");
            setClothingItems((prevItems) =>
              prevItems.filter((item) => item._id !== selectedCard._id)
            );
            handleCloseModal();
          })
          .catch((err) => {
            console.error("Error deleting item:", err.message);
            setError("Failed to delete item. Please try again later.");
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        console.log("User not logged in, cannot delete item");
        setError("You must be logged in to delete items.");
      }
    } else {
      console.error("No item selected for deletion");
      setError("No item selected for deletion.");
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

  const handleCardLike = (card) => {
    const isLiked = isLoggedIn
      ? card.likes && card.likes.some((id) => id === currentUser?._id)
      : card.likes && card.likes.includes("anonymous");

    setClothingItems((prevItems) =>
      prevItems.map((item) =>
        item._id === card._id
          ? {
              ...item,
              likes: isLiked
                ? item.likes.filter(
                    (id) => id !== (isLoggedIn ? currentUser?._id : "anonymous")
                  )
                : [
                    ...(item.likes || []),
                    isLoggedIn ? currentUser?._id : "anonymous",
                  ],
            }
          : item
      )
    );

    if (!isLoggedIn) {
      return;
    }

    const likeAction = isLiked ? removeCardLike : addCardLike;
    likeAction(card._id)
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedCard._id ? updatedCard : item
          )
        );
      })
      .catch((err) => {
        console.log(err);

        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === card._id ? card : item))
        );
      });
  };

  const closeAllModals = () => {
    handleCloseModal();
  };

  useEffect(() => {
    if (isLoggedIn) {
      const intervalId = setInterval(() => {
        pingServer()
          .then(() => {
            console.log("Server pinged successfully");
          })
          .catch((error) => {
            console.error("Failed to ping server:", error);
          });
      }, 50000);

      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn]);

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
            onRegisterClick={() => setActiveModal("register")}
            onLoginClick={() => setActiveModal("login")}
            onLogout={handleLogout}
            weatherData={weatherData}
            onAddNewClick={handleAddClick}
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
                  onDeleteClick={handleDeleteClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    onSelectCard={handleCardClick}
                    onAddClick={handleAddClick}
                    onSignOut={handleLogout}
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleCardLike}
                    onEditProfile={handleEditProfileClick}
                  />
                </ProtectedRoute>
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
              isLoggedIn={isLoggedIn}
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
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={closeAllModals}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
