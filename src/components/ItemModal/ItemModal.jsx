import React from "react";
import "./ItemModal.css";
import closeButton from "../../assets/closebutton.png";

function ItemModal({ activeModal, item, onClose, onDeleteClick }) {
  console.log("ItemModal props:", {
    activeModal,
    item,
    onClose,
    onDeleteClick,
  });
  if (!item || activeModal !== "preview") return null;
  const handleDelete = () => {
    console.log("handleDelete called, onDeleteClick:", onDeleteClick);
    if (typeof onDeleteClick === "function") {
      onDeleteClick(item);
    } else {
      console.error("onDeleteClick is not a function");
    }
  };

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
          <button
            type="button"
            onClick={handleDelete}
            className="modal__delete-button"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
