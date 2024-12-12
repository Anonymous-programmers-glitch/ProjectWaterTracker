import { useState } from "react";
// import { useSelector } from "react-redux";
// import UserLogoModal from "./UserLogoModal";
import ChevronDoubleUp from "../ui/icons/ChevronDoubleUp";
import css from "./UserLogo.module.css";
import user from "../../testUser.json";

const UserLogo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { user } = useSelector((state) => state.auth);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const userName = user.name ? user.name : user.email;

  const avatarContent = user.avatar ? (
    <img src={user.avatar} alt="User Avatar" className={css.userAvatar} />
  ) : (
    <span>{(user.name || user.email[0]).charAt(0).toUpperCase()}</span>
  );

  return (
    <>
      <button className={css.userLogoBtn} onClick={toggleModal}>
        {/* {avatarContent} */}
        {/* <span>{user.name || user.email}</span> */}

        <span className={css.userLogoBtnText}>{userName}</span>

        <span className={css.userAvatarWrapper}>{avatarContent}</span>

        <span>
          <ChevronDoubleUp />
        </span>
      </button>
      {/* {isModalOpen && <UserLogoModal onClose={toggleModal} user={user} />} */}
    </>
  );
};

export default UserLogo;
