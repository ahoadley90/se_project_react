import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onSelectCard,
  onCardLike,
  onAddClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : clothingItems;

  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button className="clothes-section__add-button" onClick={onAddClick}>
          + Add new
        </button>
      </div>
      <div className="clothes-section__items">
        {userClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onSelectCard={onSelectCard}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </section>
  );
}

export default ClothesSection;
