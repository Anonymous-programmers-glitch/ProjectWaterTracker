import dayjs from "dayjs";
import { useEffect, useCallback, Fragment } from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEditData,
  selectEditModal,
} from "../../redux/modalToggle/selectors.js";
import { closeEditModal } from "../../redux/modalToggle/slice.js";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop.jsx";
import Button from "../ui/Button/Button.jsx";
import MinusSmall from "../ui/icons/MinusSmall.jsx";
import PlusSmall from "../ui/icons/PlusSmall.jsx";
import XMarkOutline from "../ui/icons/XMarkOutline.jsx";
import Inputs from "../ui/Inputs/Inputs.jsx";
import GlassOfWater from "../ui/icons/GlassOfWater.jsx";
import css from "./TodayListModal.module.css";
import { editWaterToday } from "../../redux/waterToday/operations.js";

const EditListModal = () => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector(selectEditModal);
  const data = useSelector(selectEditData);
  const { amount, date, _id } = data;
  const time = dayjs(date).format("HH:mm");
  const day = dayjs(date).format("YYYY-MM-DD");

  const handelCloseModal = useCallback(() => {
    dispatch(closeEditModal());
  }, [dispatch]);

  const handleSubmit = (values) => {
    const data = {
      _id: _id,
      amount: values.amount,
      date: dayjs(`${day} ${values.time}`).toISOString(),
    };
    dispatch(editWaterToday(data));
    handelCloseModal();
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

  const validationSchema = Yup.object({
    amount: Yup.number()
      .min(50, "Minimum amount is 50 ml")
      .max(5000, "Maximum amount is 5000 ml")
      .integer("Amount must be an integer")
      .required("Amount of water is required")
      .typeError("Please enter a valid number"),
  });

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
          <div className={css.modalHeader}>
            <h2>Edit the entered amount of water</h2>
            <button
              className={css.modalClose}
              onClick={handelCloseModal}
              aria-label="Close"
            >
              <XMarkOutline size={24} />
            </button>
          </div>

          <div className={css.editInfo}>
            <div className={css.watericon}>
              <GlassOfWater size={36} />
            </div>
            <strong>{amount || 0}ml</strong>
            <strong className={css.time}>{time || "00:00"}</strong>
          </div>

          <Formik
            initialValues={{
              amount: Number(amount) || 0,
              time: time || "00:00",
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form className={css.form}>
                <div className={css.formGroupWater}>
                  <p className={css.text}>Correct entered data:</p>
                  <label className={css.labelWater}>Amount of water:</label>
                  <div className={css.amountButtons}>
                    <button
                      className={css.buttonWater}
                      type="button"
                      onClick={() =>
                        setFieldValue("amount", Math.max(0, values.amount - 50))
                      }
                      disabled={values.manualAmount <= 0}
                    >
                      <MinusSmall size={24} />
                    </button>
                    <span className={css.amountTotalWater}>
                      {values.amount} ml
                    </span>
                    <button
                      className={css.buttonWater}
                      type="button"
                      onClick={() =>
                        setFieldValue("amount", Math.min(5000, values.amount + 50)
                      )
                      }
                      disabled={values.manualAmount >= 5000}
                    >
                      <PlusSmall size={24} />
                    </button>
                  </div>
                  {errors.amount && touched.amount && (
                    <div className={css.error}>{errors.amount}</div>
                  )}
                </div>

                <div className={css.formGroupTime}>
                  <label htmlFor="time" className={css.labelWater}>
                    Recording time:
                  </label>
                  <Inputs
                    className={css.field}
                    type="time"
                    name="time"
                    placeholder="HH:mm"
                    value={values.time}
                    onChange={(e) => {
                      setFieldValue("time", e.target.value);
                    }}
                  />
                </div>

                <div className={css.formGroupTime}>
                  <label htmlFor="amount" className={css.label}>
                    Enter the value of the water used:
                  </label>
                  <Inputs
                    className={css.field}
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    min="0"
                    max="5000"
                    step="50"
                    value={values.amount}
                    onChange={(e) => {
                      const value = Math.max(0, Number(e.target.value));
                      setFieldValue("manualAmount", value);
                    }}
                  />
                  <Fragment></Fragment>

                </div>

                <div className={css.formFooter}>
                  <span className={css.totalWater}>{values.amount} ml</span>
                  <Button cssstyle="save" type="submit">
                    Save
                  </Button>
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
