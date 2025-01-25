import React, { useState } from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothingSection from "../ClothingSection/ClothingSection.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";

function Profile() {
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
        <ClothingSection onCardClick={handleCardClick} />
      </section>
      <ItemModal
        activeModal={activeModal}
        item={selectedCard}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Profile;
