import { useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import UserLogoModal from "./UserLogoModal";
import ChevronDoubleUp from "../ui/icons/ChevronDoubleUp";
import css from "./UserLogo.module.css";
import user from "../../testUser.json";
import UserLogoModal from "../UserLogoModal/UserLogoModal";

const UserLogo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { user } = useSelector((state) => state.auth);
  const buttonRef = useRef(null);

  // const toggleModal = () => setIsModalOpen(!isModalOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const userName = user.name ? user.name : "Guest";

  const avatarContent = user.avatar ? (
    <img
      src={user.avatar}
      alt="User Avatar"
      className={css.userLogoBtnAvatar}
    />
  ) : (
    <span>{(user.name || user.email[0]).charAt(0).toUpperCase()}</span>
  );

  return (
    <>
      <button className={css.userLogoBtn} onClick={openModal} ref={buttonRef}>
        <div className={css.userLogoBtnText}>{userName}</div>

        <div className={css.userLogoBtnWrapper}>
          <div className={css.userLogoBtnAvatarWrapper}>{avatarContent}</div>

          <ChevronDoubleUp size="16" fill="#407BFF" />
        </div>
      </button>
      {isModalOpen && (
        <UserLogoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          targetRef={buttonRef}
        />
      )}
    </>
  );
};

export default UserLogo;
