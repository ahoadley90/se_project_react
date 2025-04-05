import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemCard({ item, onSelectCard, onDeleteItem }) {
  const handleClick = () => {
    onSelectCard(item);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img
        src={item.link || item.imageUrl}
        alt={item.name}
        className="card__image"
      />
      {onDeleteItem && (
        <button
          className="card__delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteItem(item._id);
          }}
        >
          Delete
        </button>
      )}
      <div className="card__name">{item.name}</div>
    </div>
  );
}

export default ItemCard;
