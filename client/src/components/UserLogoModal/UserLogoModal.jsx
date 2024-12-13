import { useState } from "react";
import css from "./UserLogoModal.module.css";
import Modal from "react-modal";
import CogToothOutline from "../ui/icons/CogToothOutline";
import ArrowRightOnRectangle from "../ui/icons/ArrowRightOnRectangle";

Modal.setAppElement("#root");

const UserLogoModal = ({ isOpen, onClose, targetRef }) => {
  if (!isOpen || !targetRef.current) return null;

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const openModal = (setState) => {
    setState(true);
    onClose();
  };

  const getModalPosition = () => {
    const rect = targetRef.current.getBoundingClientRect();
    return {
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left + window.scrollX + 4}px`,
    };
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      style={{
        content: {
          ...getModalPosition(),
        },
        overlay: null,
      }}
    >
      <button
        onClick={() => openModal(setIsSettingOpen)}
        className={css.modalBtn}
      >
        <div className={css.modalWrapper}>
          <div className={css.icon}>
            <CogToothOutline size="16" color="#407BFF" />
          </div>
          <span className={css.modalText}>Setting</span>
        </div>
      </button>

      <button
        onClick={() => openModal(setIsLogoutOpen)}
        className={css.modalBtn}
      >
        <div className={css.modalWrapper}>
          <div className={css.icon}>
            <ArrowRightOnRectangle size="16" color="#407BFF" />
          </div>
          <span className={css.modalText}>Log out</span>
        </div>
      </button>

      {/* <SettingModal
        isOpen={isSettingOpen}
        onClose={() => setIsSettingOpen(false)}
      />
      <UserLogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      /> */}
    </Modal>
  );
};

export default UserLogoModal;
