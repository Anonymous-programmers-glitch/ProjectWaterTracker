import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import CogToothOutline from "../ui/icons/CogToothOutline";
import ArrowRightOnRectangle from "../ui/icons/ArrowRightOnRectangle";

import {
  closeLogoModal,
  openLogoutModal,
  openSettingModal,
} from "../../redux/modalToggle/slice";
import { selectLogoModal } from "../../redux/modalToggle/selectors";
import css from "./UserLogoModal.module.css";

Modal.setAppElement("#root");

const UserLogoModal = ({ targetRef }) => {
  const dispatch = useDispatch();
  const isLogoModalOpen = useSelector(selectLogoModal);

  if (!isLogoModalOpen || !targetRef.current) return null;

  const getModalPosition = () => {
    if (!targetRef.current) return {};

    const rect = targetRef.current.getBoundingClientRect();
    return {
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
    };
  };

  return (
    <Modal
      isOpen={isLogoModalOpen}
      onRequestClose={() => dispatch(closeLogoModal())}
      className={css.modal}
      style={{
        content: {
          ...getModalPosition(),
        },
        overlay: {
          backgroundColor: "transparent",
        },
      }}
    >
      <button
        onClick={() => dispatch(openSettingModal())}
        className={css.modalBtn}
      >
        <div className={css.icon}>
          <CogToothOutline size="16" color="currentColor" />
        </div>
        <p className={css.modalText}>Setting</p>
      </button>

      <button
        onClick={() => dispatch(openLogoutModal())}
        className={css.modalBtn}
      >
        <div className={css.icon}>
          <ArrowRightOnRectangle size="16" color="currentColor" />
        </div>
        <p className={css.modalText}>Log out</p>
      </button>
    </Modal>
  );
};

export default UserLogoModal;
