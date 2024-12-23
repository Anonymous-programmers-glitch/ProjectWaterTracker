import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop.jsx";
import XMarkOutline from "../ui/icons/XMarkOutline.jsx";
import css from "./ResetPasswordModal.module.css";
import { closeResetPasswordModal } from "../../redux/modalToggle/slice.js";
import { selectResetPasswordModal } from "../../redux/modalToggle/selectors.js";
import { requestResetToken } from "../../redux/user/operations.js";
import Button from "../ui/Button/Button.jsx";
import Input from "../ui/Inputs/Inputs.jsx";
// import { Field } from "formik";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ResetPasswordModal = () => {
  const dispatch = useDispatch();
  const isResetPasswordModalOpen = useSelector(selectResetPasswordModal);

  const handleSubmit = (values, actions) => {
    console.log("values.email :>> ", values.email);

    dispatch(requestResetToken(values.email));
    // .unwrap()
    // .then(() => dispatch(closeLogoutModal()))
    // .catch((error) => {
    //   console.error("Error exiting:", error);
    // });
    actions.resetForm();
    dispatch(closeResetPasswordModal());
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        dispatch(closeResetPasswordModal());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (isResetPasswordModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isResetPasswordModalOpen, handleKeyDown]);

  if (!isResetPasswordModalOpen) return null;

  return (
    <ModalBackdrop onClick={() => dispatch(closeResetPasswordModal())}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeaderContainer}>
          <h2 className={css.modalHeader}>Reset password</h2>
          <button
            className={css.modalClose}
            onClick={() => dispatch(closeResetPasswordModal())}
            aria-label="Close"
          >
            <XMarkOutline className={css.modalCloseIcon} />
          </button>
        </div>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={ResetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {/* <label htmlFor="email" className={css.labelWater}>
                Enter your email:
              </label>
              <Field
                type="email"
                name="email"
                placeholder="your_email@mail.com"
                className={css.field}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              /> */}
              <Input
                type="email"
                name="email"
                placeholder="your_email@mail.com"
              />
              <div className={css.modalButtons}>
              <Button cssstyle="save">Send</Button>
              </div>
            </Form>
          )}
        </Formik>
        {/* <label htmlFor="email" className={css.labelWater}>
          Enter your email:
        </label>
        <Input
          type="text"
          name="email"
          placeholder="your_email@mail.com"
          className={css.field}
        />
        {/* <Field type="text" name="email" className={css.field} /> */}
        {/* <div className={css.modalButtons}>
          <Button cssstyle={css.btnCancel} onClick={handleSubmit}>
            Send
          </Button> */}{" "}
        {/* </div> */}
      </div>
    </ModalBackdrop>
  );
};

export default ResetPasswordModal;
