import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import XMarkOutline from "../ui/icons/XMarkOutline.jsx";
import css from "./UserLogoutModal.module.css";
import { closeLogoutModal } from "../../redux/modalToggle/slice";
import { selectLogoutModal } from "../../redux/modalToggle/selectors";
import { logout } from "../../redux/user/operations";

const UserLogoutModal = () => {
  const dispatch = useDispatch();
  const isLogoutModalOpen = useSelector(selectLogoutModal);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => dispatch(closeLogoutModal()))
      .catch((error) => {
        console.error("Error exiting:", error);
      });
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        dispatch(closeLogoutModal());
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (isLogoutModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isLogoutModalOpen, handleKeyDown]);

  if (!isLogoutModalOpen) return null;

  return (
    <ModalBackdrop onClick={() => dispatch(closeLogoutModal())}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeaderContainer}>
          <h2 className={css.modalHeader}>Log out</h2>
          <button
            className={css.modalClose}
            onClick={() => dispatch(closeLogoutModal())} // Исправлено здесь
            aria-label="Close"
          >
            <XMarkOutline className={css.modalCloseIcon} />
          </button>
        </div>
        <p className={css.modalText}>Do you really want to leave?</p>
        <div className={css.modalButtons}>
          <button
            onClick={() => dispatch(closeLogoutModal())}
            className={css.btnCancel}
          >
            Cancel
          </button>
          <button onClick={handleLogout} className={css.btnLogout}>
            Log out
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export default UserLogoutModal;
