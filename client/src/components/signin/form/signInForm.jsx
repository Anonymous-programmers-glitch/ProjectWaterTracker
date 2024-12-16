import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/auth/operations.js";
import * as Yup from "yup";
import css from "./signInForm.module.css";
import EyeOutline from "../../ui/icons/EyeOutline.jsx";
import EyeSlashOutline from "../../ui/icons/EyeSlashOutline.jsx";

const initialValues = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .min(8, "Password is too short - should be 6 chars minimum.")
      .max(64, "Password is too long - should be 64 chars maximum."),
  });
  const dispatch = useDispatch();

  const size = "24";

  const signinId = useId();
  const passwordId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(login(values));
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
      validationSchema={SignInSchema}
    >
      {() => {
        return (
          <Form autoComplete="off" className={css.wrapper}>
            <h3 className={css.h3}>Sign In</h3>
            <label className={css.label} htmlFor={signinId}>
              Enter your email
              <Field
                type="email"
                name="email"
                className={css.input}
                placeholder="E-mail"
                id={signinId}
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
            <button type="submit" className={css.btn}>
              Sign In
            </button>
            <NavLink to="/signup" className={css.link}>
              <p>Sign up</p>
            </NavLink>
          </Form>
        );
      }}
    </Formik>
  );
}
