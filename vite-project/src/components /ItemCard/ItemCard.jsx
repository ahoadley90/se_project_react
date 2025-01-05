import React from "react";
import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <div className="item-card">
      <img src={item.link} alt={item.name} className="item-card__image" />
      <div className="item-card__title-background">
        <h2 className="item-card__title">{item.name}</h2>
      </div>
    </div>
  );
}

export default ItemCard;
