import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDeleteData,
  selectDeleteModal,
} from "../../redux/modalToggle/selectors.js";
import { closeDeleteModal } from "../../redux/modalToggle/slice.js";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import XMarkOutline from "../ui/icons/XMarkOutline";
import Button from "../ui/Button/Button.jsx";
import css from "./DeleteWaterModal.module.css";

import { deleteWaterToday } from "../../redux/waterToday/operations";
import { updateNotifier } from "../../utils/updateNotifier.js";

const DeleteWaterModal = () => {
  const dispatch = useDispatch();
  const isDeleteModalOpen = useSelector(selectDeleteModal);
  const data = useSelector(selectDeleteData);

  const handleDelete = async () => {
    await updateNotifier({
      dispatchAction: (vals) => dispatch(deleteWaterToday(vals)),
      values: data,
      closeModal: () => dispatch(closeDeleteModal()),
      status: 200,
    });
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        dispatch(closeDeleteModal());
      }
    },
    [dispatch]
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
              <XMarkOutline size={24} />
            </button>
          </div>
          <p className={css.modalText}>
            Are you sure you want to delete the entry?
          </p>
          <div className={css.modalButtons}>
            <Button
              onClick={() => dispatch(closeDeleteModal())}
              cssstyle="cancel"
            >
              Cancel
            </Button>
            <Button cssstyle="delete" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </ModalBackdrop>
    )
  );
};

export default DeleteWaterModal;
