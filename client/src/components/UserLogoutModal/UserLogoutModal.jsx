import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../redux/userSlice";
import axios from "axios";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import css from "./UserLogoutModal.module.css";
import XMarkOutline from "../ui/icons/xMarkOutline";
import Button from "../ui/Button/Button";

const UserLogoutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      dispatch(clearUserData());
      onClose();
    } catch (error) {
      console.error("Error on exit:", error);
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeaderContainer}>
          <h2 className={css.modalHeader}>Log out</h2>
          <button
            className={css.modalClose}
            onClick={onClose}
            aria-label="Close"
          >
            <XMarkOutline className={css.modalCloseIcon} />
          </button>
        </div>
        <p className={css.modalText}>Do you really want to leave?</p>
        <div className={css.modalButtons}>
          <Button onClick={onClose} className={css.btnCancel}>
            Cancel
          </Button>
          <Button onClick={handleLogout} className={css.btnLogout}>
            Log out
          </Button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

UserLogoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserLogoutModal;

