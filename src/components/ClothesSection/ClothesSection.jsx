import React from "react";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants.js";
import "./ClothesSection.css";

function ClothingSection({ onCardClick }) {
  const clothingItems = defaultClothingItems;
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <p className="clothes-section__add-button">+ Add new</p>
      </div>
      <div className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </div>
    </div>
  );
}

export default ClothingSection;
