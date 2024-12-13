import { Form, Formik, ErrorMessage } from "formik";
// import { Field } from "formik";
import * as Yup from "yup";
import css from "./Settings.module.css";
import { useDispatch } from "react-redux";
import { HiArrowDownTray } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";
import user from "../../testUser.json";
import Button from "../ui/Button/Button.jsx";
import Inputs from "../ui/Inputs/Inputs.jsx";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().min(1, "Name is Too Short."),
  email: Yup.string().email().required("Email is Required."),
  outdatedPassword: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  newPassword: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  repeatNewPassword: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
});

export default function Settings() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log(values);

    dispatch();
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        gender: "woman",
        outdatedPassword: "",
        newPassword: "",
        repeatNewPassword: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.formWrapper}>
        <h2 className={css.mainTitle}>Settings</h2>
        <HiXMark style={{ color: "#407BFF" }} size={24} />

        <h3 className={css.photoTitle}>Your photo</h3>
        <div className={css.imgWrapper}>
          <img src={user.avatar} alt="User photo" className={css.photo} />
          <button type="button" className={css.buttonUpload}>
            <HiArrowDownTray style={{ color: "407BFF" }} />
            Upload a photo
          </button>
        </div>
        <div className={css.wrapperTwoBlocks}>
          <div className={css.firstWrapper}>
            <h3 className={css.genderTitle}>Your gender identity</h3>

            <div className={css.genderOptions}>
              <div className={css.genderWrapper}>
                <input
                  type="radio"
                  name="gender"
                  id="woman"
                  defaultChecked
                  // className={style.input}
                />
                <label htmlFor="woman" className={css.genderInput}>
                  Woman
                </label>
              </div>
              <div className={css.genderWrapper}>
                <input type="radio" name="gender" id="man" />
                <label htmlFor="man" className={css.genderInput}>
                  Man
                </label>
              </div>
            </div>

            <div className={css.userInfo}>
              <label className={css.labelUser}>
                Name
                {/* <Field type="text" name="name" placeholder="Name" /> */}
                <Inputs type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" component="span" />
              </label>

              <label className={css.labelUser}>
                Email
                {/* <Field type="email" name="email" placeholder="Email" /> */}
                <Inputs type="email" name="email" placeholder="Email" />
                {/* <ErrorMessage name="email" component="span" /> */}
              </label>
            </div>
          </div>

          <div className={css.passwordWrapper}>
            <h3>Password</h3>
            <label className={css.labelPassword}>
              Outdated password:
              {/* <Field
                type="password"
                name="outdatedPassword"
                placeholder="Old password"
              /> */}
              <Inputs
                type="password"
                name="outdatedPassword"
                placeholder="Password"
              />
              <ErrorMessage name="outdatedPassword" component="span" />
            </label>

            <label className={css.labelPassword}>
              New password:
              {/* <Field
                type="password"
                name="newPassword"
                placeholder="New password"
              /> */}
              <Inputs
                type="password"
                name="newPassword"
                placeholder="Password"
              />
              <ErrorMessage name="newPassword" component="span" />
            </label>

            <label className={css.labelPassword}>
              Repeat new password:
              {/* <Field
                type="password"
                name="repeatNewPassword"
                placeholder="Repeat new password"
              /> */}
              <Inputs
                type="password"
                name="repeatNewPassword"
                placeholder="Password"
              />
              <ErrorMessage name="repeatNewPassword" component="span" />
            </label>
          </div>
        </div>

        <Button
          type="submit"
          cssStyle={css.btn}
          onClick={handleSubmit}
          // className={css.btn}
        >
          Submit
        </Button>

        {/* <button type="submit" className={css.btn}>
          Submit
        </button> */}
      </Form>
    </Formik>
  );
}
