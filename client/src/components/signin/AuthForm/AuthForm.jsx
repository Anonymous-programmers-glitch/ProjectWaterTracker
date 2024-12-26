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
import toast from "react-hot-toast";

import Inputs from "../../ui/Inputs/Inputs.jsx";


import { updateNotifier } from "../../../utils/updateNotifier.js";


const initialValues = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .required("Required")
      .test("is-valid-email", "Invalid email address", (value) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
      }),
    password: Yup.string()
      .required("Required")
      .min(8, "Should be 8 chars minimum.")
      .max(64, "Should be 64 chars maximum."),
  });
  const dispatch = useDispatch();
  const isResetPasswordModalOpen = useSelector(selectResetPasswordModal);

  const size = "16";

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
      setPasswordVisible(<EyeOutline size={size} />);
    } else {
      setInputType("password");
      setPasswordVisible(<EyeSlashOutline size={size} />);
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
                <Inputs
                  type="email"
                  name="email"
                  className={css.field}
                  placeholder="E-mail"
                  id={signinId}
                />
              </div>
              <div className={css.passwordWrapper}>
                <label className={css.label} htmlFor={passwordId}>
                  Enter your password{" "}
                </label>
                <div className={css.psw}>
                  <Inputs
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
              </div>
              <Button type="submit" cssstyle="signin">
                Sign In
              </Button>
              <TextButton
                clas={css.link}
                onClick={() => dispatch(openResetPasswordModal())}
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
