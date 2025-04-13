import React, { useContext } from "react";
import "./ItemModal.css";
import closeButton from "../../assets/closebutton.png";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemModal({ activeModal, item, onClose, onDelete, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwner = isLoggedIn && currentUser && item.owner === currentUser._id;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeButton} alt="Close" className="modal__close-icon" />
        </button>
        <img
          src={item.imageUrl || item.link || item.image}
          alt={item.name}
          className="modal__image"
        />
        <div className="modal__caption">
          <p className="modal__title">{item.name}</p>
          <p className="modal__weather">Weather: {item.weather}</p>
          {isOwner && (
            <button
              type="button"
              onClick={onDelete}
              className="modal__delete-button"
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
