import React, { useContext, useState } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import CurrentUserContext from "../../context/CurrentUserContext";
import { updateUserProfile } from "../../utils/api";
import "./Profile.css";

function Profile({ clothingItems, onSelectCard, onAddClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleUpdateUser = (userData) => {
    updateUserProfile(userData)
      .then((updatedUser) => {
        currentUser.updateUser(updatedUser);
        handleCloseEditProfileModal();
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };
  return (
    <div className="profile">
      <SideBar onSignOut={onSignOut} />
      <div className="profile__content">
        <div className="profile__header">
          <h2 className="profile__title">Your Profile</h2>
          <button className="profile__edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
        <ClothesSection
          clothingItems={clothingItems}
          onSelectCard={onSelectCard}
          onAddClick={onAddClick}
        />
      </div>
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={handleCloseEditProfileModal}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}

export default Profile;
