import React from "react";
import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <div className="item-card">
      <img src={item.imageUrl} alt={item.name} />
      <h3>{item.name}</h3>
    </div>
  );
}

export default ItemCard;
