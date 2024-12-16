import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/auth/operations.js";
import * as Yup from "yup";
import css from "./signUpForm.module.css";
import EyeOutline from "../../ui/icons/EyeOutline.jsx";
import EyeSlashOutline from "../../ui/icons/EyeSlashOutline.jsx";

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

export default function SignUpForm() {
  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required("Please confirm your password")
      .min(8, "Password is too short - should be 6 chars minimum.")
      .max(64, "Password is too long - should be 64 chars maximum."),
    repeatPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Password must match"),
  });

  const dispatch = useDispatch();

  const size = "24";

  const signupId = useId();
  const passwordId = useId();
  const repeatPasswordId = useId();

  const handleSubmit = (values, actions) => {
    const { email, password } = values;

    dispatch(signup({ email, password }));
    actions.resetForm();
  };

  const [passwordVisible, setPasswordVisible] = useState(
    <EyeOutline size={size} />
  );
  const [inputType, setInputType] = useState("password");

  const togglePasswordVisibility = () => {
    if (inputType === "password") {
      setInputType("text");
      setPasswordVisible(EyeSlashOutline);
    } else {
      setInputType("password");
      setPasswordVisible(EyeOutline);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SignUpSchema}
    >
      {() => {
        return (
          <Form autoComplete="off" className={css.wrapper}>
            <h3 className={css.h3}>Sign Up</h3>
            <label className={css.label} htmlFor={signupId}>
              Enter your email
              <Field
                type="email"
                name="email"
                className={css.input}
                placeholder="E-mail"
                id={signupId}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.errorEmail}
              />
            </label>
            <label className={css.label} htmlFor={passwordId}>
              Enter your password
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
                className={css.errorPswrd}
              />
            </label>
            <label className={css.label} htmlFor={repeatPasswordId}>
              Repeat password
              <div className={css.psw}>
                <Field
                  type={inputType}
                  name="repeatPassword"
                  placeholder="Repeat password"
                  id={repeatPasswordId}
                  className={css.field}
                />
                <span className={css.icon} onClick={togglePasswordVisibility}>
                  {passwordVisible}
                </span>
              </div>
              <ErrorMessage
                name="repeatPassword"
                component="span"
                className={css.errorRepeatPswrd}
              />
            </label>
            <button type="submit" className={css.btn}>
              Sign Up
            </button>
            <NavLink to="/signin" className={css.link}>
              <p>Sign in</p>
            </NavLink>
          </Form>
        );
      }}
    </Formik>
  );
}
