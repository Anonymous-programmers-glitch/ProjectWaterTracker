import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { selectDailyNormaModal } from "../../redux/modalToggle/selectors.js";
import css from "./MyDailyForma.module.css";
import Button from "../ui/Button/Button.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import MarkOutline from "../ui/icons/XMarkOutline.jsx";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop.jsx";
import { closeDailyNormaModal } from "../../redux/modalToggle/slice.js";
import { update } from "../../redux/user/operations.js";
import { putHistory } from "../../redux/updateHistori/operations.js";

const DailySchema = Yup.object().shape({
  weightInKg: Yup.number()
    .min(1, "Enter your weight in kilograms")
    .max(200, "Max weight 200 kilograms"),
  loadInHours: Yup.number()
    .min(0, "Active hours cannot be negative")
    .max(24, "Maximum hours is 24"),
  waterYouDrink: Yup.number()
    .min(0.1, "Enter at least 0.1 liters")
    .max(5.0, "Maximum 5 liters")
    .required("This field is required"),
  option: Yup.string()
    .oneOf(["female", "male"])
    .required("Please select a gender"),
});

const MyDailyNorma = () => {
  const isOpen = useSelector(selectDailyNormaModal);
  const dispatch = useDispatch();

  const calculateWaterNorm = (weight, hours, isWoman) => {
    const weightFactor = isWoman ? 0.03 : 0.04;
    const activityFactor = isWoman ? 0.04 : 0.06;
    return (weight * weightFactor + hours * activityFactor).toFixed(2);
  };

  const handleSubmit = async (values, actions) => {
    try {
      const myDailyNorma = values.waterYouDrink * 1000;
      const currentDate = new Date().toISOString();
      await dispatch(update({ dailyNorma: myDailyNorma }));
      await dispatch(
        putHistory({ date: currentDate, dailyNorma: myDailyNorma })
      );
      toast.success("Your daily norma has been successfully updated!");
      actions.resetForm();
      handleCloseModal();
    } catch (error) {
      toast.error("Something wrong! Please try again.");
    }
  };

  const handleCloseModal = () => {
    dispatch(closeDailyNormaModal());
  };

  // const notify = () => toast("Personal data updated");
  return (
    isOpen && (
      <>
        <ModalBackdrop onClick={handleCloseModal}>
          <div
            className={css.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Formik
              initialValues={{
                weightInKg: "",
                loadInHours: "",
                waterYouDrink: "",
                option: "female",
              }}
              validationSchema={DailySchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors }) => (
                <Form className={css.modalForm}>
                  <h2 className={css.text1}>My daily norma</h2>
                  <div className={css.coverToBtn}>
                    <div className={css.closeBtn} onClick={handleCloseModal}>
                      <MarkOutline />
                    </div>
                    <div className={css.cover}>
                      <p className={css.for}>
                        For girl:{" "}
                        <span className={css.formula}>
                          V=(M*0,03) + (T*0,4)
                        </span>{" "}
                      </p>
                      <p className={css.for}>
                        For man:{" "}
                        <span className={css.formula}>
                          V=(M*0,04) + (T*0,6)
                        </span>
                      </p>
                    </div>
                    <p className={css.modalDescr}>
                      * V is the volume of the water norm in liters per day, M
                      is your body weight, T is the time of active sports, or
                      another type of activity commensurate in terms of loads
                      (in the absence of these, you must set 0)
                    </p>
                    <p className={css.textRadioBtn}>Calculate your rate:</p>

                    <label className={css.labels}>
                      <Field type="radio" name="option" value="female" />
                      <ErrorMessage
                        component="span"
                        className={css.error}
                        name="option"
                      />
                      <span className={css.span}>For girl</span>
                    </label>

                    <label className={css.labels}>
                      <Field type="radio" name="option" value="male" />
                      <ErrorMessage
                        name="option"
                        component="span"
                        className={css.error}
                      />
                      <span className={css.span}>For man</span>
                    </label>

                    <p className={css.text}>Your weight in kilograms:</p>
                    <Field
                      className={`${css.modalInput} ${
                        errors.weightInKg ? css.modalInputError : ""
                      }`}
                      type="number"
                      name="weightInKg"
                      placeholder="0"
                      min="0"
                      max="200"
                    />
                    <ErrorMessage
                      name="weightInKg"
                      component="span"
                      className={css.error}
                    />

                    <p className={css.text}>
                      The time of active participation in sports or other
                      activities with a high physical. load in hours:
                    </p>
                    <Field
                      className={`${css.modalInput} ${
                        errors.loadInHours ? css.modalInputError : ""
                      }`}
                      type="number"
                      name="loadInHours"
                      placeholder="0"
                      min="0"
                      max="24"
                    />
                    <ErrorMessage
                      name="loadInHours"
                      component="span"
                      className={css.error}
                    />

                    <p className={css.text}>
                      The required amount of water in liters per day:
                    </p>
                    <p className={css.textRadioBtn2}>
                      Write down how much water you will drink:{" "}
                      <span className={css.spanResult}>
                        {calculateWaterNorm(
                          parseFloat(values.weightInKg || 0),
                          parseFloat(values.loadInHours || 0),
                          values.option === "female"
                        )}{" "}
                        L
                      </span>
                    </p>

                    <Field
                      className={`${css.modalInput} ${
                        errors.waterYouDrink ? css.modalInputError : ""
                      }`}
                      type="number"
                      name="waterYouDrink"
                      placeholder="0"
                      min="0"
                      max="5"
                    />

                  <ErrorMessage
                    name="waterYouDrink"
                    component="span"
                    className={css.error}
                  />
                  <div className={css.btn}>
                    
                    <button
                    onClick={notify}
                      className={css.cssstyleBtn}
                      type="submit"
                    >
                      Save
                    </button>
                    <Toaster/>

                      {/* <div className={css.cssstyle}>
                          <Button cssstyle={css.cssstyle} type="submit">Save</Button>
                      </div> */}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </ModalBackdrop>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              zIndex: 1050,
            },
          }}
        />
      </>
    )
  );
};

export default MyDailyNorma;
