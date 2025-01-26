import React, { useState } from "react";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import "./Profile.css";

function Profile({ clothingItems, onDeleteItem }) {
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
        <ClothesSection
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
