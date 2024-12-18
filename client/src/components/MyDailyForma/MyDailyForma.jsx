import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { selectDailyNormaModal } from "../../redux/modal/selectors.js";
import css from "./MyDailyForma.module.css";
// import { useEffect, useState } from "react";
import Button from "../../components/ui/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import MarkOutline from "../ui/icons/XMarkOutline.jsx";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop.jsx";
import {
  closeDailyNormaModal,
  // closeSettingModal,
} from "../../redux/modal/slice.js";
import { update } from "../../redux/user/operations.js";

const DailySchema = Yup.object().shape({
  weightInKg: Yup.number()
    .min(2, "Enter your weight in kilograms")
    .max(200, "Too long, max 200 numbers"),
  // .required("This field is required"),
  loadInHours: Yup.number()
    .min(0, "Active hours cannot be negative")
    .max(24, "Maximum hours is 24"),
  // .required("This field is required"),
  waterYouDrink: Yup.number()
    .min(0.1, "Enter at least 0.1 liters")
    .max(5, "Maximum 10 liters")
    .required("This field is required"),
  option: Yup.string()
    .oneOf(["female", "male"])
    .required("Please select a gender"),
});

const MyDailyNorma = () => {
  const isOpen = useSelector(selectDailyNormaModal);
  const dispatch = useDispatch();

  // const [norma, setNorma] = useState("");
  // const [norma2, setNorma2] = useState("");
  // const [result, setResult] = useState("");
  // const [isWoman, setIsWoman] = useState(true);
  // const [waterYouDrink, setWaterYouDrink] = useState("");

  const calculateWaterNorm = (weight, hours, isWoman) => {
    const weightFactor = isWoman ? 0.03 : 0.04;
    const activityFactor = isWoman ? 0.04 : 0.06;
    return (weight * weightFactor + hours * activityFactor).toFixed(2);
  };

  const handleSubmit = (values, actions) => {
    console.log("Submitted data:", values.waterYouDrink);

    const myDayliNorma = values.waterYouDrink * 1000;

    dispatch(update({ dailyNorma: myDayliNorma }));
    actions.resetForm();
    handleCloseModal();
  };

  // // for woman
  // useEffect(() => {
  //   if (isWoman) {
  //     setResult(norma * 0.03 + norma2 * 0.04);
  //   }
  // }, [norma, norma2, isWoman]);

  // // for man
  // useEffect(() => {
  //   if (!isWoman) {
  //     setResult(norma * 0.04 + norma2 * 0.06);
  //   }
  // }, [norma, norma2, isWoman]);

  const handleCloseModal = () => {
    dispatch(closeDailyNormaModal());
  };

  return (
    isOpen && (
      <ModalBackdrop onClick={handleCloseModal}>
        <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
          <Formik
            initialValues={{
              weightInKg: "",
              loadInHours: "",
              waterYouDrink: "",
              option: "female",
            }}
            validationSchema={DailySchema}
            // onSubmit={(values, action) => {
            //   console.log(values);
            //   action.resetForm();
            // }}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className={css.modalForm}>
                <h2 className={css.text1}>My daily norma</h2>
                <div className={css.coverToBtn}>
                  <div className={css.closeBtn} onClick={handleCloseModal}>
                    <MarkOutline />
                  </div>
                  {/* <CloseIcon className={css.closeIcon} onClick={() => setActive(false)}></CloseIcon> */}
                  <div className={css.cover}>
                    <p className={css.for}>
                      For girl:{" "}
                      <span className={css.formula}>V=(M*0,03) + (T*0,4)</span>{" "}
                    </p>
                    <p className={css.for}>
                      For man:{" "}
                      <span className={css.formula}>V=(M*0,04) + (T*0,6)</span>
                    </p>
                  </div>
                  <p className={css.modalDescr}>
                    * V is the volume of the water norm in liters per day, M is
                    your body weight, T is the time of active sports, or another
                    type of activity commensurate in terms of loads (in the
                    absence of these, you must set 0)
                  </p>
                  <p className={css.textRadioBtn}>Calculate your rate:</p>

                  <label className={css.labels}>
                    <Field
                      type="radio"
                      name="option"
                      value="female"
                      // value="woman"
                      // checked={isWoman === true}
                      // id="For woman"
                      // onChange={() => setIsWoman(true)}
                    />
                    <ErrorMessage
                      component="span"
                      className={css.error}
                      name="option"
                    />
                    <span className={css.span}>For woman</span>
                  </label>

                  <label className={css.labels}>
                    <Field
                      type="radio"
                      name="option"
                      value="male"
                      // value="man"
                      // checked={isWoman === false}
                      // id="For man"
                      // onChange={() => setIsWoman(false)}
                    />
                    <ErrorMessage
                      name="option"
                      component="span"
                      className={css.error}
                    />
                    <span className={css.span}>For man</span>
                  </label>

                  <p className={css.text}>Your weight in kilograms:</p>
                  <Field
                    className={css.modalInput}
                    type="number"
                    name="weightInKg"
                    placeholder="0"
                    // value={norma}
                    // onChange={(e) => setNorma(e.target.value)}
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
                    className={css.modalInput}
                    type="number"
                    name="loadInHours"
                    placeholder="0"
                    // value={norma2}
                    // onChange={(e) => setNorma2(e.target.value)}
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
                    {/* <span className={css.spanResult}>{result} L</span> */}
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
                    className={css.modalInput}
                    type="number"
                    name="waterYouDrink"
                    // value={waterYouDrink}
                    // onChange={(e) => setWaterYouDrink(e.target.value)}
                    placeholder="0"
                  />

                  <ErrorMessage
                    name="waterYouDrink"
                    component="span"
                    className={css.error}
                  />
                  <div className={css.btn}>
                    {/* <Button
                    cssstyle={css.btn}
                    disabled={waterYouDrink >= 5 || !waterYouDrink}
                    type="submit"
                  >
                    Save
                  </Button> */}
                    {/* <button className="cssstyle" disabled={waterYouDrink < 5 || !waterYouDrink}
          onClick={onClickHandle} type="submit">Save</button> */}
                    <button
                      className="cssstyle"
                      // disabled={waterYouDrink < 5 || !waterYouDrink}
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </ModalBackdrop>
    )
  );
};

export default MyDailyNorma;
