import React from "react";
import "./ItemCard.css";

function ItemCard({
  item,
  onSelectCard,
  onCardLike,
  isLoggedIn,
  currentUser,
  onDeleteClick,
}) {
  console.log("ItemCard rendering", item, currentUser);
  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike(item);
  };

  const isLiked =
    currentUser &&
    item.likes &&
    item.likes.some((id) => id === currentUser._id);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteClick(item);
  };

  const isOwner = currentUser && item.owner === currentUser._id;

  return (
    <div className="item-card" onClick={() => onSelectCard(item)}>
      <img
        src={item.imageUrl || item.link}
        alt={item.name}
        className="item-card__image"
      />
      <div className="item-card__title-background">
        <div className="item-card__title">{item.name}</div>
      </div>
      {isLoggedIn && currentUser && (
        <>
          <button
            className={`item-card__like-button ${
              isLiked ? "item-card__like-button_active" : ""
            }`}
            onClick={handleLikeClick}
          >
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill={isLiked ? "black" : "none"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 17L8.55 15.7C3.4 11.1 0 8.1 0 4.75C0 2.05 2.1 0 4.85 0C6.35 0 7.8 0.65 8.85 1.7L10 2.85L11.15 1.7C12.2 0.65 13.65 0 15.15 0C17.9 0 20 2.05 20 4.75C20 8.1 16.6 11.1 11.45 15.7L10 17Z"
                stroke="black"
              />
            </svg>
          </button>
          {isOwner}
        </>
      )}
    </div>
  );
}

export default ItemCard;
