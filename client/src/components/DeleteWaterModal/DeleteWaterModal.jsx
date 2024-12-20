import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDeleteData,
  selectDeleteModal,
} from "../../redux/modalToggle/selectors.js";
import { closeDeleteModal } from '../../redux/modalToggle/slice.js';
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import XMarkOutline from "../ui/icons/XMarkOutline";
import css from "./DeleteWaterModal.module.css";

import { deleteWaterToday } from "../../redux/waterToday/operations";

const DeleteWaterModal = () => {
  const dispatch = useDispatch();
  const isDeleteModalOpen = useSelector(selectDeleteModal);
  const data = useSelector(selectDeleteData);


  const handleDelete = () => {
     dispatch(deleteWaterToday(data));
     dispatch(closeDeleteModal());

  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
      dispatch(closeDeleteModal());
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (isDeleteModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isDeleteModalOpen, handleKeyDown]);


  return (
    isDeleteModalOpen && (
      <ModalBackdrop onClick={() => dispatch(closeDeleteModal())}>
        <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={css.modalHeaderContainer}>
            <h2 className={css.modalHeader}>Delete entry</h2>
            <button
              className={css.modalClose}
              onClick={() => dispatch(closeDeleteModal())}
              aria-label="Close"
            >
              <XMarkOutline className={css.modalCloseIcon} />
            </button>
          </div>
          <p className={css.modalText}>
            Are you sure you want to delete the entry?
          </p>
          <div className={css.modalButtons}>
            <button
              onClick={() => dispatch(closeDeleteModal())}
              className={css.btnCancel}
            >
              Cancel
            </button>
            <button onClick={handleDelete} className={css.btnDelete}>
              Delete
            </button>
          </div>
        </div>
      </ModalBackdrop>
    )
  );
};

export default DeleteWaterModal;
