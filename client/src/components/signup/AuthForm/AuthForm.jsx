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

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
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

export default function SignUpForm() {
  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required("Please confirm your password")
      .min(8, "Should be 8 chars minimum.")
      .max(64, "Should be 64 chars maximum.")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*)."
      ),
    repeatPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Password must match"),
  });

  const dispatch = useDispatch();

  const size = "24";

  const signupId = useId();
  const passwordId = useId();
  const repeatPasswordId = useId();

  const handleSubmit = async (values, actions) => {
    const { email, password } = values;

    const response = await dispatch(signup({ email, password }));

    const updateStatus = response.payload?.status;
    const updateMessage =
      response.payload?.data?.message || response.payload?.message;

    if (updateStatus === 201) {
      toast.success(`${updateMessage}`);
      actions.resetForm();
    } else {
      toast.error(`${updateMessage}`);
    }

    // dispatch(signup({ email, password }));

    // const result = await dispatch(signup({ email, password }));
    // const message = result.payload.data.message;

    // if (result.error) {
    //   switch (result.payload.status) {
    //     case 409:
    //       toast.error(message);
    //       break;
    //     case 400:
    //       toast.error(message);
    //       break;
    //     default:
    //       toast.error(message);
    //       break;
    //   }
    // } else {
    //   toast.success("Successfully registered a user!");

    //   toast((t) => (
    //     <span>
    //       Check your email to confirm it!
    //       <button type="button" onClick={() => toast.dismiss(t.id)}>
    //         <b>OK</b>
    //       </button>
    //     </span>
    //   ));
    //   actions.resetForm();
    // }
    actions.resetForm();
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
                validate={validateEmail}
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
            <Button type="submit" cssstyle="signup">
              Sign Up
            </Button>
            <NavLink to="/signin" className={css.link}>
              <p>Sign in</p>
            </NavLink>
          </Form>
        );
      }}
    </Formik>
  );
}
