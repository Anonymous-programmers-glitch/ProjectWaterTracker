import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectResetPasswordModal } from "../../../redux/modalToggle/selectors.js";
import { openResetPasswordModal } from "../../../redux/modalToggle/slice.js";
import { login } from "../../../redux/user/operations.js";
import * as Yup from "yup";
import ResetPasswordModal from "../../ResetPasswordModal/ResetPasswordModal.jsx";
import TextButton from "../../ui/TextButton/TextButton.jsx";
import css from "./AuthForm.module.css";
import Button from "../../ui/Button/Button.jsx";
import EyeOutline from "../../ui/icons/EyeOutline.jsx";
import EyeSlashOutline from "../../ui/icons/EyeSlashOutline.jsx";
import { updateNotifier } from "../../../utils/updateNotifier.js";

const initialValues = {
  email: "",
  password: "",
};

function validateEmail(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

export default function SignInForm() {
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .min(8, "Should be 8 chars minimum.")
      .max(64, "Should be 64 chars maximum."),
  });
  const dispatch = useDispatch();
  const isResetPasswordModalOpen = useSelector(selectResetPasswordModal);

  const size = "24";

  const signinId = useId();
  const passwordId = useId();

  const handleSubmit = async (values, actions) => {
    const { email, password } = values;
    await updateNotifier({
      dispatchAction: (vals) => dispatch(login(vals)),
      values: { email, password },
      resetForm: actions?.resetForm,
      status: 200,
    });
  };

  const [passwordVisible, setPasswordVisible] = useState(
    <EyeSlashOutline size={size} />
  );
  const [inputType, setInputType] = useState("password");

  const togglePasswordVisibility = () => {
    if (inputType === "password") {
      setInputType("text");
      setPasswordVisible(EyeOutline);
    } else {
      setInputType("password");
      setPasswordVisible(EyeSlashOutline);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignInSchema}
      >
        {() => {
          return (
            <Form autoComplete="off" className={css.wrapper}>
              <h3 className={css.h3}>Sign In</h3>
              <div>
                <label className={css.label} htmlFor={signinId}>
                  Enter your email{" "}
                </label>
                <Field
                  type="email"
                  name="email"
                  className={css.input}
                  placeholder="E-mail"
                  id={signinId}
                  validate={validateEmail}
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />
              </div>
              <div>
                <label className={css.label} htmlFor={passwordId}>
                  Enter your password{" "}
                </label>
                <div className={css.psw}>
                  <Field
                    type={inputType}
                    name="password"
                    placeholder="Password"
                    id={passwordId}
                    className={css.field}
                  />
                  <span className={css.icon} onClick={togglePasswordVisibility}>
                    {passwordVisible}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />
              </div>
              <Button type="submit" cssstyle="signin">
                Sign In
              </Button>
              <TextButton
                onClick={async () => await dispatch(openResetPasswordModal())}
              >
                Forgot your password?
              </TextButton>
              <NavLink to="/signup" className={css.link}>
                <p>Sign up</p>
              </NavLink>
            </Form>
          );
        }}
      </Formik>
      {isResetPasswordModalOpen && <ResetPasswordModal />}
    </>
  );
}
