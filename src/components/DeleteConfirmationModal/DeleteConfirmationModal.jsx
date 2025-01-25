import React from "react";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={'modal ${isOpen && "modal_opened"} modal_type_confirm'}>
      <div className="modal__content-delete">
        <h2>Are you sure you want to delete this item?</h2>
        <p>This action is irreversible.</p>
        <div className="modal__buttons">
          <button
            onClick={onClose}
            className="modal__button modal__button_type_cancel"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="modal__button modal__button_type_confirm"
          >
            Yes, delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
