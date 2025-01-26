import React from "react";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants.js";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  onCardClick,
  onDeleteItem,
  handleAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <div className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
