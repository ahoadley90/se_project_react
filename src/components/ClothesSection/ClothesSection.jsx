import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants.js";
import "./ClothesSection.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onCardClick,
  onDeleteItem,
  handleAddClick,
  onSelectCard,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button className="clothes-section__add-button" onClick={onAddClick}>
          + Add new
        </button>
      </div>
      <div className="clothes-section__cards">
        {userClothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
