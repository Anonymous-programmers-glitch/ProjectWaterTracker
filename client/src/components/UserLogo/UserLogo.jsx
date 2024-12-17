import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChevronDoubleUp from "../ui/icons/ChevronDoubleUp";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import {
  closeLogoModal,
  openLogoModal,
  selectLogoModal,
  selectLogoutModal,
  selectSettingModal,
} from "../../redux/modal/modalSlice";

import css from "./UserLogo.module.css";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";

import SettingModal from "../SettingModal/SettingModal";
import { selectUser } from "../../redux/auth/selectors";

const UserLogo = () => {
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const isLogoModalOpen = useSelector(selectLogoModal);
  const isSettingModalOpen = useSelector(selectSettingModal);
  const isLogoutModalOpen = useSelector(selectLogoutModal);
  const toggleModal = () => {
    if (isLogoModalOpen) {
      dispatch(closeLogoModal());
    } else {
      dispatch(openLogoModal());
    }
  };

  const user = useSelector(selectUser);
  if (!user) return null;

  const userName = user.name ?? user.email;

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
      <button className={css.userLogoBtn} onClick={toggleModal} ref={buttonRef}>
        <div className={css.userLogoBtnText}>{userName}</div>

        <div className={css.userLogoBtnWrapper}>
          <div className={css.userLogoBtnAvatarWrapper}>{avatarContent}</div>

          <ChevronDoubleUp size="16" fill="#407BFF" />
        </div>
      </button>

      {isLogoModalOpen && <UserLogoModal targetRef={buttonRef} />}

      {isSettingModalOpen && <SettingModal />}
      {isLogoutModalOpen && <UserLogoutModal />}
    </>
  );
};

export default UserLogo;
