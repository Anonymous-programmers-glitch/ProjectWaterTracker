import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDeleteData } from '../../redux/modalToggle/selectors.js';
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import XMarkOutline from "../ui/icons/XMarkOutline";
import css from "./DeleteWaterModal.module.css";
import { closeDeleteModal } from "../../redux/modal/slice"; 
import { selectDeleteModal } from "../../redux/modal/selectors"; 
import { deleteWaterToday } from "../../redux/waterToday/operations"; 

const DeleteWaterModal = ({id}) => {
  const dispatch = useDispatch();
  const isDeleteModalOpen = useSelector(selectDeleteData);
  console.log(isDeleteModalOpen);
  const handleDelete = () => {

    dispatch(deleteWaterToday(isDeleteModalOpen));

    dispatch(deleteWaterToday())
      .unwrap()
      .then(() => dispatch(closeDeleteModal()))
      .catch((error) => {
        console.error("Error deleting entry:", error);
      });
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

  if (!isDeleteModalOpen) return null;

  return (
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
        <p className={css.modalText}>Are you sure you want to delete the entry?</p>
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
  );
};

export default DeleteWaterModal;