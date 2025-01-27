import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import "./Profile.css";

function Profile({ clothingItems, onCardClick, onDeleteItem, handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onDeleteItem={onDeleteItem}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
