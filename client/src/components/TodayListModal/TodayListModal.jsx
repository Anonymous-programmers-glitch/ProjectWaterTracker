import { useState, useEffect, useCallback } from "react";
import { Formik, Form } from "formik";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEditData,
  selectEditModal,
} from "../../redux/modal/selectors.js";
import { closeEditModal, closeLogoutModal } from "../../redux/modal/slice.js";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import Button from "../../components/ui/Button/Button";
import XMarkOutline from "../ui/icons/XMarkOutline.jsx";
import GlassOfWater from "../ui/icons/GlassOfWater";
import MinusSmall from "../ui/icons/MinusSmall";
import PlusSmall from "../ui/icons/PlusSmall";
import Inputs from "../ui/Inputs/Inputs";
import css from "./TodayListModal.module.css";

const TodayListModal = () => {
  // { isOpen, mode, initialData, onSave, onClose }
  const dispatch = useDispatch();
  const isOpenModal = useSelector(selectEditModal);
  const data = useSelector(selectEditData);
  // const [time, setTime] = useState(
  //   initialData?.time || dayjs().format("HH:mm"),
  // );
  //
  const handleSubmit = (values) => {
    // const formattedTime = dayjs(values.manualTime, "HH:mm").format("h:mm A");
    // onSave({ ...values, amount: values.manualAmount, time: formattedTime });
    // onClose();
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
      }
    },
    [isOpenModal],
  );
  function handelCloseModal() {
    dispatch(closeEditModal());
  }
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

          {/*{mode === "edit" && initialData && (*/}
          {/*  <div className={css.editInfo}>*/}
          {/*    <div className={css.watericon}>*/}
          {/*      <GlassOfWater size={36} />*/}
          {/*    </div>*/}
          {/*    <strong>{initialData.amount} ml</strong>*/}
          {/*    <strong className={css.time}>{initialData.time}</strong>*/}
          {/*  </div>*/}
          {/*)}*/}

          <Formik
            initialValues={{
              manualAmount: 0,
              manualTime: 0,
            }}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className={css.form}>
                <div className={css.formGroup}>
                  <p>Choose a value:</p>
                </div>

                <div className={css.formGroupWater}>
                  <label className={css.labelWater}>Amount of water:</label>
                  <div className={css.amountButtons}>
                    <button
                      className={css.buttonWater}
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          "manualAmount",
                          Math.max(0, values.manualAmount - 50),
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
                      setTime(e.target.value);
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

export default TodayListModal;
