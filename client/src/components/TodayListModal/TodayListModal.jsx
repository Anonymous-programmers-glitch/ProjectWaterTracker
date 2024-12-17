import { useState, useEffect, useCallback } from "react";
import { Formik, Form } from "formik";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import Button from "../../components/ui/Button/Button";
import XMarkOutline from "../ui/icons/xMarkOutline";
import GlassOfWater from "../ui/icons/GlassOfWater";
import MinusSmall from "../ui/icons/MinusSmall";
import PlusSmall from "../ui/icons/PlusSmall";
import Inputs from "../ui/Inputs/Inputs";
import css from "./TodayListModal.module.css";

const TodayListModal = ({ isOpen, mode, initialData, onSave, onClose }) => {
  // Состояние для хранения количества воды
  const [waterAmount, setWaterAmount] = useState(initialData?.amount || 0);
  
  // Состояние для хранения времени
  const [time, setTime] = useState(
    initialData?.time || dayjs().format("HH:mm")
  );

  // Функция для изменения количества воды
  const handleAmountChange = (delta, setFieldValue) => {
    const newAmount = Math.max(0, waterAmount + delta); // Ограничиваем минимальное значение нулем
    setWaterAmount(newAmount);
    setFieldValue("manualAmount", newAmount); // Обновляем значение в форме
  };

  // Функция обработки отправки формы
  const handleSubmit = (values) => {
    // Форматируем время
    const formattedTime = dayjs(values.manualTime, "HH:mm").format("h:mm A");
    // Сохраняем данные
    onSave({ ...values, amount: waterAmount, time: formattedTime });
    // Закрываем модальное окно
    onClose();
  };

  // Обработчик клавиши Escape для закрытия модального окна
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Используем useEffect для добавления и удаления слушателя клавиш
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    isOpen && (
      <ModalBackdrop
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose(); // Закрываем модальное окно при клике вне его
          }
        }}
      >
        <div className={css.modal}>
          <div className={css.modalHeaderWrapper}>
            <div className={css.modalHeader}>
              <h2>
                {mode === "add"
                  ? "Add water"
                  : "Edit the entered amount of water"}
              </h2>
              <button
                className={css.modalClose}
                onClick={onClose}
                aria-label="Close"
              >
                <XMarkOutline className={css.modalCloseIcon} />
              </button>
            </div>
          </div>

          {/* Если модальное окно в режиме редактирования, показываем данные */}
          {mode === "edit" && initialData && (
            <div className={css.editInfo}>
              <div className={css.watericon}>
                <GlassOfWater size={36} />
              </div>
              <strong>{initialData.amount} ml</strong>
              <strong className={css.time}>{initialData.time}</strong>
            </div>
          )}

          <Formik
            initialValues={{ manualAmount: waterAmount, manualTime: time }}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className={css.form}>
                <div className={css.formGroup}>
                  <p>
                    {mode === "add" ? "Choose a value:" : "Correct entered data:"}
                  </p>
                </div>

                <div className={css.formGroupWater}>
                  <label className={css.labelWater}>Amount of water:</label>
                  <div className={css.amountButtons}>
                    <button
                      className={css.buttonWater}
                      type="button"
                      onClick={() => handleAmountChange(-50, setFieldValue)}
                    >
                      <MinusSmall />
                    </button>
                    <span className={css.amountTotalWater}>
                      {waterAmount} ml
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAmountChange(50, setFieldValue)}
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
                      setWaterAmount(value);
                    }}
                  />
                </div>

                <div className={css.formFooter}>
                  <span className={css.totalWater}> {waterAmount} ml</span>
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

TodayListModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(["add", "edit"]).isRequired,
  initialData: PropTypes.shape({
    amount: PropTypes.number,
    time: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

TodayListModal.defaultProps = {
  initialData: null,
};

export default TodayListModal;

