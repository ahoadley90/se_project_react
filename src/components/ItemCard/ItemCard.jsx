import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onSelectCard, onCardLike, isLoggedIn }) {
  const handleLikeClick = () => {
    e.stopPropagation();
    onCardLike(item);
  };

  return (
    <div className="card">
      <img
        src={item.imageUrl || item.link}
        alt={item.name}
        className="card__image"
        onClick={() => onSelectCard(item)}
      />
      <div className="card__info">
        <p className="card__name">{item.name}</p>
        {isLoggedIn && (
          <button
            className={`card__like-button ${
              item.isLiked ? "card__like-button_active" : ""
            }`}
            onClick={handleLikeClick}
          >
            ♥
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
