import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/user/operations.js";
import * as Yup from "yup";
import Button from "../../ui/Button/Button.jsx";
import css from "./AuthForm.module.css";
import EyeOutline from "../../ui/icons/EyeOutline.jsx";
import EyeSlashOutline from "../../ui/icons/EyeSlashOutline.jsx";
import toast from "react-hot-toast";
//import { CheckEmail } from "../../signin/errorMsgFn.jsx";

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
      .min(8, "Should be 8 chars minimum.")
      .max(64, "Should be 64 chars maximum."),
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
    toast((t) => (
      <span>
        Check your email to confirm it!
        <button onClick={() => toast.dismiss(t.id)}>
          <b>OK</b>
        </button>
      </span>
    ));
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
            <div>
              <label className={css.label} htmlFor={signupId}>
                Enter your email{" "}
              </label>
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
                className={css.errorPswrd}
              />
            </div>
            <div>
              <label className={css.label} htmlFor={repeatPasswordId}>
                Repeat password{" "}
              </label>
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
            </div>
            <Button cssstyle="signup">Sign Up</Button>
            <NavLink to="/signin" className={css.link}>
              <p>Sign in</p>
            </NavLink>
          </Form>
        );
      }}
    </Formik>
  );
}
