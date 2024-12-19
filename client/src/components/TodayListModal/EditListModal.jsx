import { useEffect, useCallback } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEditData,
  selectEditModal,
} from "../../redux/modal/selectors.js";
import { closeEditModal } from "../../redux/modal/slice.js";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop.jsx";
import Button from "../ui/Button/Button.jsx";
import XMarkOutline from "../ui/icons/xMarkOutline.jsx";
import MinusSmall from "../ui/icons/MinusSmall.jsx";
import PlusSmall from "../ui/icons/PlusSmall.jsx";
import Inputs from "../ui/Inputs/Inputs.jsx";
import GlassOfWater from "../ui/icons/GlassOfWater.jsx";
import css from "./TodayListModal.module.css";
import { editWaterToday } from "../../redux/waterToday/operations.js";

const EditListModal = () => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector(selectEditModal);
  const data = useSelector(selectEditData);

  const handelCloseModal = useCallback(() => {
    dispatch(closeEditModal());
  }, [dispatch]);

  const handleSubmit = (values) => {
    if (data?.id) {
      dispatch(
        editWaterToday({
          id: data.id,
          manualAmount: values.manualAmount,
          manualTime: values.manualTime,
        })
      );
      handelCloseModal();
    } else {
      console.error("Invalid data ID");
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        handelCloseModal();
      }
    },
    [handelCloseModal]
  );

  useEffect(() => {
    if (isOpenModal) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpenModal, handleKeyDown]);

  return (
    isOpenModal && (
      <ModalBackdrop
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handelCloseModal();
          }
        }}
      >
        <div className={css.modal}>
          <div className={css.modalHeaderWrapper}>
            <div className={css.modalHeader}>
              <h2>Edit the entered amount of water</h2>
              <button
                className={css.modalClose}
                onClick={handelCloseModal}
                aria-label="Close"
              >
                <XMarkOutline className={css.modalCloseIcon} />
              </button>
            </div>
          </div>

          <div className={css.editInfo}>
            <div className={css.watericon}>
              <GlassOfWater size={36} />
            </div>
            <strong>{data?.manualAmount || 0} ml</strong>
            <strong className={css.time}>{data?.manualTime || "00:00"}</strong>
          </div>

          <Formik
            initialValues={{
              manualAmount: data?.manualAmount || 0,
              manualTime: data?.manualTime || "00:00",
            }}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className={css.form}>
                <div className={css.formGroup}>
                  <p>Correct entered data:</p>
                </div>

                <div className={css.formGroupWater}>
                  <label className={css.label}>Amount of water:</label>
                  <div className={css.amountButtons}>
                    <button
                      className={css.buttonWater}
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          "manualAmount",
                          Math.max(0, values.manualAmount - 50)
                        )
                      }
                    >
                      <MinusSmall />
                    </button>
                    <span className={css.amountTotalWater}>
                      {values.manualAmount} ml
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue("manualAmount", values.manualAmount + 50)
                      }
                    >
                      <PlusSmall />
                    </button>
                  </div>
                </div>

                <div className={css.formGroupTime}>
                  <label htmlFor="manualTime" className={css.label}>
                    Recording time:
                  </label>
                  <Inputs
                    className={css.customField}
                    type="time"
                    name="manualTime"
                    placeholder="HH:mm"
                    value={values.manualTime}
                    onChange={(e) => {
                      setFieldValue("manualTime", e.target.value);
                    }}
                  />
                </div>

                <div className={css.formGroupTime}>
                  <label htmlFor="manualAmount" className={css.labelWater}>
                    Enter the value of the water used:
                  </label>
                  <Inputs
                    className={css.customField}
                    type="number"
                    name="manualAmount"
                    placeholder="Enter amount"
                    step="50"
                    value={values.manualAmount}
                    onChange={(e) => {
                      const value = Math.max(0, Number(e.target.value));
                      setFieldValue("manualAmount", value);
                    }}
                  />
                </div>

                <div className={css.formFooter}>
                  <span className={css.totalWater}>
                    {values.manualAmount} ml
                  </span>
                  <Button type="submit">Save</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </ModalBackdrop>
    )
  );
};

export default EditListModal;

