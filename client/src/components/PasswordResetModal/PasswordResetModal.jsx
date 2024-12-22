import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closePasswordResetModal } from "../../redux/modalToggle/slice.js";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop.jsx";
import XMarkOutline from "../ui/icons/XMarkOutline.jsx";
import Button from "../ui/Button/Button.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; 
import css from "./PasswordResetModal.module.css";

const PasswordResetModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closePasswordResetModal());
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form values:", values);

    resetForm();
    handleClose();
  };

  return (
    <ModalBackdrop onClick={handleClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeaderContainer}>
          <h2 className={css.modalHeader}>Reset Password</h2>
          <button
            className={css.modalClose}
            onClick={handleClose}
            aria-label="Close"
          >
            <XMarkOutline size={24} />
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <p className={css.modalText}>
                Enter your email to reset your password:
              </p>
              <div className={css.fieldContainer}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={css.field}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>
              <div className={css.modalButtons}>
                <Button
                  type="submit"
                  cssstyle="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalBackdrop>
  );
};

export default PasswordResetModal;
