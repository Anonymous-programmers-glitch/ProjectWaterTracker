import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop.jsx";
import XMarkOutline from "../ui/icons/XMarkOutline.jsx";
import css from "./ResetPasswordModal.module.css";
import { closeResetPasswordModal } from "../../redux/modalToggle/slice.js";
import { selectResetPasswordModal } from "../../redux/modalToggle/selectors.js";
import { requestResetToken } from "../../redux/user/operations.js";
import Button from "../ui/Button/Button.jsx";
import Input from "../ui/Inputs/Inputs.jsx";
import toast, { Toaster } from "react-hot-toast";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ResetPasswordModal = () => {
  const dispatch = useDispatch();
  const isResetPasswordModalOpen = useSelector(selectResetPasswordModal);

  const handleSubmit = async (values, actions) => {
    const { payload } = await dispatch(requestResetToken(values.email));
    const newError = payload.status === 200 ? payload.status : payload;
    if (newError) {
      switch (newError) {
        case 200:
          toast.success("Reset password email has been successfully sent!");
          actions.resetForm();
          dispatch(closeResetPasswordModal());
          break;
        case 404:
          toast.error(`User not found!`);
          break;
        default:
          toast.error(`Somethings wrong!`);
          break;
      }
    }
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
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
                <Input
                  type="email"
                  name="email"
                  placeholder="your_email@mail.com"
                  className={css.field}
                />
                <div className={css.modalButtons}>
                  <Button type="submit" cssstyle={css.btnCancel}>
                    Send
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </ModalBackdrop>
    </>
  );
};

export default ResetPasswordModal;
