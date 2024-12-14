import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import './UserLogoutModal.css';

const UserLogoutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error('Ошибка при выходе:', error);
      });
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-container">
          <h2 className="modal-header">Log out</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="4" y1="20" x2="20" y2="4" />
            </svg>
          </button>
        </div>
        <p className="modal-text">Do you really want to leave?</p>
        <div className="modal-buttons">
          <button onClick={onClose} className="btn-cancel">Cancel</button>
          <button onClick={handleLogout} className="btn-logout">Log out</button>
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