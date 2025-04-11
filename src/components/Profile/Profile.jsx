import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  clothingItems,
  onSelectCard,
  onAddClick,
  onSignOut,
  onEditProfile,
  onCardLike,
  isLoggedIn,
  currentUser,
}) {
  return (
    <div className="profile">
      <SideBar
        onSignOut={onSignOut}
        onEditProfile={onEditProfile}
        currentUser={currentUser}
      />
      <div className="profile__content">
        <ClothesSection
          clothingItems={clothingItems}
          onSelectCard={onSelectCard}
          onAddClick={onAddClick}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}

export default Profile;
