import React, { useState } from "react";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ClothingSection from "../ClothingSection/ClothingSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";

function Profile({ clothingItems, onCardClick, onDeleteItem }) {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (item) => {
    setActiveModal("preview");
    setSelectedCard(item);
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  return (
    <div className="profile">
      <section className="profile">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothingSection
          onCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </section>
      <ItemModal
        activeModal={activeModal}
        item={selectedCard}
        onClose={handleCloseModal}
        onDelete={onDeleteItem}
      />
    </div>
  );
}

export default Profile;
