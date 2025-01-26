import React from "react";
import "./DeleteConfirmationModal.css";
import closeButton from "../../assets/closebutton.png";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"} modal_type_confirm`}>
      <div className="modal__content-delete">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeButton} alt="Close" className="modal__close-icon" />
        </button>
        <h2 className="modal__confirm-delete">
          Are you sure you want to delete this item?
        </h2>
        <p className="modal__cofirm-action">This action is irreversible.</p>
        <div className="modal__buttons">
          <button
            onClick={onConfirm}
            className="modal__button modal__button_type_confirm"
          >
            Yes, delete item
          </button>
          <button
            onClick={onClose}
            className="modal__button modal__button_type_cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
