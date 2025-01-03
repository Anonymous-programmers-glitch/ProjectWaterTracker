import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useId, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Button from "../ui/Button/Button.jsx";
import Inputs from "../ui/Inputs/Inputs.jsx";
import css from "./ForgotPassword.module.css";
import EyeOutline from "../ui/icons/EyeOutline.jsx";
import EyeSlashOutline from "../ui/icons/EyeSlashOutline.jsx";
import { resetPassword } from "../../redux/user/operations.js";
import { useSearchParams } from "react-router";
import { updateNotifier } from "../../utils/updateNotifier.js";

const initialValues = {
  password: "",
  repeatPassword: "",
};

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ForgotSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please confirm your password")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .max(64, "Password is too long - should be 64 chars maximum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number.")
      .matches(
        /(?=.*[!@#$%^&*(),.?":{}|<>])/,
        "Password must contain a special character."
      )
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter."
      ),
    repeatPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Password must match"),
  });

  const size = "24";

  const passwordId = useId();
  const repeatPasswordId = useId();

  const handleSubmit = async (values, actions) => {
    const token = searchParams.get("token");
    const { password } = values;
    await updateNotifier({
      dispatchAction: (vals) => dispatch(resetPassword(vals)),
      values: { password, token },
      resetForm: actions?.resetForm,
      status: 200,
    });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setRepeatPasswordVisible(!repeatPasswordVisible);
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ForgotSchema}
    >
      {() => {
        return (
          <Form autoComplete="off" className={css.wrapper}>
            <label className={css.label} htmlFor={passwordId}>
              Enter a new password
              <Inputs
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                id={passwordId}
                className={css.input}
              />
              {passwordVisible ? (
                <div className={css.icon} onClick={togglePasswordVisibility}>
                  <EyeOutline size={size} />
                </div>
              ) : (
                <div className={css.icon} onClick={togglePasswordVisibility}>
                  <EyeSlashOutline size={size} />
                </div>
              )}
            </label>
            <label className={css.label} htmlFor={repeatPasswordId}>
              Repeat new password
              <Inputs
                type={repeatPasswordVisible ? "text" : "password"}
                name="repeatPassword"
                placeholder="Repeat password"
                id={repeatPasswordId}
                className={css.input}
              />
              {repeatPasswordVisible ? (
                <div
                  className={css.icon}
                  onClick={toggleRepeatPasswordVisibility}
                >
                  <EyeOutline size={size} />
                </div>
              ) : (
                <div
                  className={css.icon}
                  onClick={toggleRepeatPasswordVisibility}
                >
                  <EyeSlashOutline size={size} />
                </div>
              )}
            </label>
            <Button cssstyle="signup" onClick={handleSignInClick}>
              Create new password
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
