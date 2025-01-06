function ItemModal({ activeModal, item, onClose }) {
  console.log("ItemModal item:", item);
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal modal_type_image">
        <div className="modal__content modal__content_type_image">
          <button onClick={onClose} type="button" className="modal__close">
            CLOSE
          </button>
          <img src={item.link} alt={item.name} className="modal__image" />
          <div className="modal__caption">
            <p className="modal__title">{item.name}</p>
            <p className="modal__weather">Weather: {item.weather}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
