import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/user/operations.js";
import * as Yup from "yup";
import css from "./AuthForm.module.css";
//import Input from "../../ui/Inputs/Inputs.jsx";
import Button from "../../ui/Button/Button.jsx";
import EyeOutline from "../../ui/icons/EyeOutline.jsx";
import EyeSlashOutline from "../../ui/icons/EyeSlashOutline.jsx";

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

  const size = "24";

  const signinId = useId();
  const passwordId = useId();

  const handleSubmit = (values, actions) => {
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
            <Button cssstyle="signin">Sign In</Button>
            <Button
              cssstyle="signin"
              onClick={() => {
                dispatch(
                  requestResetToken({ email: "baracuda20162016@gmail.com" })
                );
              }}
            >
              RedetPassword
            </Button>
            <NavLink to="/forgotpassword" className={css.link}>
              <p>Forgot password?</p>
            </NavLink>
            <NavLink to="/signup" className={css.link}>
              <p>Sign up</p>
            </NavLink>
          </Form>
        );
      }}
    </Formik>
  );
}
