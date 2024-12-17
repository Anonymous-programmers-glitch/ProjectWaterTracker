import { useEffect, useCallback } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import "./UserLogoutModal.module.css";
import {
  closeLogoutModal,
  selectLogoutModal,
} from "../../redux/modal/modalSlice";
import { logout } from "../../redux/auth/operations";

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
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-container">
          <h2 className="modal-header">Log out</h2>
          <button
            className="modal-close"
            onClick={() => dispatch(closeLogoutModal())}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="4" y1="20" x2="20" y2="4" />
            </svg>
          </button>
        </div>
        <p className="modal-text">Do you really want to leave?</p>
        <div className="modal-buttons">
          <button
            onClick={() => dispatch(closeLogoutModal())}
            className="btn-cancel"
          >
            Cancel
          </button>
          <button onClick={handleLogout} className="btn-logout">
            Log out
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

// UserLogoutModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

export default UserLogoutModal;
