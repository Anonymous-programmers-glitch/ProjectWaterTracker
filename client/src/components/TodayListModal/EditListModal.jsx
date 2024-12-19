import { useState, useEffect, useCallback } from "react";
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
import css from "./TodayListModal.module.css";
import { editWaterToday } from "../../redux/waterToday/operations.js"; // Импортируем операцию редактирования

const EditListModal = () => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector(selectEditModal);
  const data = useSelector(selectEditData);

  const handleSubmit = (values) => {
    // Перезаписываем данные на сервере и сохраняем в Redux
    dispatch(
      editWaterToday({
        id: data.id,  // ID записи для обновления
        manualAmount: values.manualAmount,  // Новое количество воды
        manualTime: values.manualTime,  // Новое время
      })
    );
    handelCloseModal();  // Закрываем модальное окно после сохранения
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        handelCloseModal();
      }
    },
    [isOpenModal]
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

          <Formik
            initialValues={{
              manualAmount: data?.manualAmount || 0,  // Инициализация значением из данных
              manualTime: data?.manualTime || "00:00",  // Инициализация значением из данных
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


