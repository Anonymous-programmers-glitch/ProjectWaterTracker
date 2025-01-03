import { useState, useEffect, useCallback } from "react";
import { Formik, Form } from "formik";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { closeAddModal } from "../../redux/modalToggle/slice.js";
import { selectAddModal } from "../../redux/modalToggle/selectors.js";
import { addWaterToday } from "../../redux/waterToday/operations.js";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import Button from "../../components/ui/Button/Button.jsx";
import XMarkOutline from "../ui/icons/XMarkOutline.jsx";
import MinusSmall from "../ui/icons/MinusSmall";
import PlusSmall from "../ui/icons/PlusSmall";
import Inputs from "../ui/Inputs/Inputs";
import * as Yup from "yup";
import css from "./TodayListModal.module.css";
import { updateNotifier } from "../../utils/updateNotifier.js";

const validationSchema = Yup.object({
  manualAmount: Yup.number()
    .min(50, "Minimum amount is 50 ml")
    .max(5000, "Maximum amount is 5000 ml")
    .required("Amount of water is required")
    .typeError("Please enter a valid number"),
});

const AddWaterModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectAddModal);

  const onClose = useCallback(() => {
    dispatch(closeAddModal());
  }, [dispatch]);

  const [time, setTime] = useState(dayjs().format("HH:mm"));

  const handleSubmit = async (value, actions) => {
    const { manualAmount, manualTime } = value;
    const dateNow = dayjs().format("YYYY-MM-DD");
    const date = dayjs(`${dateNow} ${manualTime}`).toISOString();

    await updateNotifier({
      dispatchAction: (vals) => dispatch(addWaterToday(vals)),
      values: { amount: manualAmount, date: date },
      closeModal: () => dispatch(closeAddModal()),
      resetForm: actions?.resetForm,
      status: 201,
    });
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {isOpen && (
        <ModalBackdrop
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <div className={css.modal}>
            <div className={css.modalHeader}>
              <h2>Add water</h2>
              <button
                className={css.modalClose}
                onClick={onClose}
                aria-label="Close"
              >
                <XMarkOutline size={24} />
              </button>
            </div>

            <Formik
              initialValues={{
                manualAmount: 50,
                manualTime: time,
              }}
              enableReinitialize
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ values, setFieldValue, errors, touched }) => (
                <Form className={css.form}>
                  <div className={css.formGroupWater}>
                    <p className={css.text}>Choose a value:</p>
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
                        disabled={values.manualAmount <= 0}
                      >
                        <MinusSmall size={24} />
                      </button>
                      <span className={css.amountTotalWater}>
                        {values.manualAmount} ml
                      </span>
                      <button
                        className={css.buttonWater}
                        type="button"
                        onClick={() =>
                          setFieldValue(
                            "manualAmount",
                            Math.min(5000, values.manualAmount + 50)
                          )
                        }
                        disabled={values.manualAmount >= 5000}
                      >
                        <PlusSmall size={24} />
                      </button>
                    </div>

                    {errors.manualAmount && touched.manualAmount && (
                      <div className={css.error}>{errors.manualAmount}</div>
                    )}
                  </div>

                  <div className={css.formGroupTime}>
                    <label htmlFor="manualTime" className={css.labelWater}>
                      Recording time:
                    </label>
                    <Inputs
                      className={css.field}
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
                    <label htmlFor="manualAmount" className={css.label}>
                      Enter the value of the water used:
                    </label>
                    <Inputs
                      className={css.field}
                      type="number"
                      name="manualAmount"
                      placeholder="Enter amount"
                      min="50"
                      max="5000"
                      step="1"
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
                    <Button cssstyle="save" type="submit">
                      Save
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </ModalBackdrop>
      )}
    </>
  );
};

export default AddWaterModal;
