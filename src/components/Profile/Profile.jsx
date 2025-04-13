import React, { useContext } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function Profile({
  clothingItems,
  onSelectCard,
  onAddClick,
  onCardLike,
  isLoggedIn,
  onEditProfile,
  onSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <SideBar
        onSignOut={onSignOut}
        onEditProfile={onEditProfile}
        onAddNew={onAddClick}
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
