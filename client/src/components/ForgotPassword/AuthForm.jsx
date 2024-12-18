import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId, useState } from "react";
import { useDispatch } from "react-redux";
//import { signup } from "../../../redux/auth/operations.js";
import * as Yup from "yup";
import Input from "../ui/Inputs/Inputs.jsx";
import Button from "../ui/Button/Button.jsx";
import css from "./AuthForm.module.css";
import EyeOutline from "../ui/icons/EyeOutline.jsx";
import EyeSlashOutline from "../ui/icons/EyeSlashOutline.jsx";

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

export default function AuthForm() {
  const ForgotSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please confirm your password")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .max(64, "Password is too long - should be 64 chars maximum."),
    repeatPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Password must match"),
  });

  const dispatch = useDispatch();

  const size = "24";

  const passwordId = useId();
  const repeatPasswordId = useId();

  const handleSubmit = (values, actions) => {
    const { password } = values;

    //dispatch(signup({ password }));
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
      validationSchema={ForgotSchema}
    >
      {() => {
        return (
          <Form autoComplete="off" className={css.wrapper}>
            <label className={css.label} htmlFor={passwordId}>
              Enter a new password
              <div className={css.psw}>
                <Input
                  type={inputType}
                  name="password"
                  placeholder="Password"
                  id={passwordId}
                />
                <span className={css.icon} onClick={togglePasswordVisibility}>
                  {passwordVisible}
                </span>
              </div>
            </label>
            <label className={css.label} htmlFor={repeatPasswordId}>
              Repeat new password
              <div className={css.psw}>
                <Input
                  type={inputType}
                  name="repeatPassword"
                  placeholder="Repeat password"
                  id={repeatPasswordId}
                />
                <span className={css.icon} onClick={togglePasswordVisibility}>
                  {passwordVisible}
                </span>
              </div>
            </label>
            <Button cssstyle="signup">Create new password</Button>
          </Form>
        );
      }}
    </Formik>
  );
}
