import React from "react";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants.js";

function ClothingSection({ onCardClick }) {
  const clothingItems = defaultClothingItems;
  return (
    <div className="clothing-section">
      {clothingItems.map((item) => (
        <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
      ))}
    </div>
  );
}

export default ClothingSection;
