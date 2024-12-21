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
import Inputs from "../ui/Inputs/Inputs.jsx";

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

  const handleSubmit = (values, actions) => {
    try {
      const myDailyNorma = values.waterYouDrink * 1000;
      const currentDate = new Date().toISOString();
      dispatch(update({ dailyNorma: myDailyNorma }));
      dispatch(putHistory({ date: currentDate, dailyNorma: myDailyNorma }));
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
                  <div className={css.top}>
                    <h2 className={css.title}>My daily norma</h2>
                    <div className={css.closeBtn} onClick={handleCloseModal}>
                      <MarkOutline />
                    </div>
                  </div>
                  <div className={css.topWrapper}>
                    <div className={css.forWrapper}>
                      <p className={css.for}>
                        For woman:{" "}
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
                      <span>*</span> V is the volume of the water norm in liters
                      per day, M is your body weight, T is the time of active
                      sports, or another type of activity commensurate in terms
                      of loads (in the absence of these, you must set 0)
                    </p>
                  </div>
                  <div className={css.wrapper}>
                    <div className={css.inputWrapper}>
                      <p className={css.titleLabel}>Calculate your rate:</p>

                      <div className={css.radioBtnWrapper}>
                        <label className={css.radio}>
                          <Field type="radio" name="option" value="female" />
                          <ErrorMessage
                            component="span"
                            className={css.error}
                            name="option"
                          />
                          <span className={css.span}>For woman</span>
                        </label>

                        <label className={css.radio}>
                          <Field type="radio" name="option" value="male" />
                          <ErrorMessage
                            name="option"
                            component="span"
                            // className={css.error}
                          />
                          <span className={css.span}>For man</span>
                        </label>
                      </div>
                    </div>
                    <div className={css.inputWrapper}>
                      <p className={css.text}>Your weight in kilograms:</p>
                      <Inputs
                        type="number"
                        className={css.field}
                        name="weightInKg"
                        placeholder="0"
                      />
                    </div>
                    <div className={css.inputWrapper}>
                      <p className={css.text}>
                        The time of active participation in sports or other
                        activities with a high physical. load in hours:
                      </p>
                      <Inputs
                        type="number"
                        className={css.field}
                        name="loadInHours"
                        placeholder="0"
                      />
                    </div>

                    <div className={css.amountWraper}>
                      <p className={`${css.text} ${css.text1}`}>
                        The required amount of water in liters per day:
                      </p>
                      <span className={css.spanResult}>
                        {calculateWaterNorm(
                          parseFloat(values.weightInKg || 0),
                          parseFloat(values.loadInHours || 0),
                          values.option === "female"
                        )}{" "}
                        L
                      </span>
                    </div>
                  </div>
                  <div className={css.inputWrapper}>
                    <p className={css.titleLabel}>
                      Write down how much water you will drink:{" "}
                    </p>

                    <Inputs
                      type="number"
                      className={css.field}
                      name="waterYouDrink"
                      placeholder="0"
                    />
                  </div>
                  <div className={css.btn}>
                    <Button type="submit" cssstyle="save">
                      Save
                    </Button>
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
