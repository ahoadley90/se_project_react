import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./ClothesSection.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onSelectCard,
  onCardLike,
  handleAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : clothingItems;

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <div className="clothes-section__cards">
        {userClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onSelectCard={() => onSelectCard(item)}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
