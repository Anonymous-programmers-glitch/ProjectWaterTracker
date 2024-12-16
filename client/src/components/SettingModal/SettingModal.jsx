import { Form, Formik, ErrorMessage } from "formik";
// import { Field } from "formik";
import * as Yup from "yup";
import css from "./SettingModal.module.css";
import { useDispatch } from "react-redux";
// import { HiArrowDownTray } from "react-icons/hi2";
import user from "../../testUser.json";
import Button from "../ui/Button/Button.jsx";
import Inputs from "../ui/Inputs/Inputs.jsx";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop.jsx";
import { useState } from "react";
import { selectUser } from "../../redux/settings/selectors.js";
import { useSelector } from "react-redux";
import { updateUser } from "../../redux/settings/operations.js";
import MarkOutline from "../ui/icons/xMarkOutline.jsx";
import EyeOutline from "../../components/ui/icons/EyeOutline.jsx";
import EyeSlashOutline from "../ui/icons/EyeSlashOutline.jsx";
import ArrowUpTrayOutline from "../ui/icons/ArrowUpTrayOutline.jsx";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().min(1, "Name is Too Short."),
  email: Yup.string().email().required("Email is Required."),
  outdatedPassword: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  newPassword: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  repeatNewPassword: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
});

export default function SettingModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const value = useSelector(selectUser);
  const [openPassword, setOpenPassword] = useState(false);

  const initialValues = {
    name: value?.name || "",
    email: value?.email || "",
    gender: value?.gender || "woman",
    outdatedPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const handleOpenPassword = () => {
    setOpenPassword((prev) => !prev);
  };

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log(values);

    dispatch(updateUser(values));
    console.log(updateUser(values));

    actions.resetForm();
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalBackdrop>
      {isModalOpen && (
        <div className={css.container} onClick={(e) => e.stopPropagation()}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
          >
            <Form className={css.formWrapper}>
              <h2 className={css.mainTitle}>Settings</h2>
              <div className={css.wrapperToBtn}>
                {/* <HiXMark
                  className={css.closeBtn}
                  size={24}
                  onClick={handleCloseModal}
                /> */}
                <div className={css.closeBtn} onClick={handleCloseModal}>
                  <MarkOutline />
                </div>

                <h3 className={css.photoTitle}>Your photo</h3>
                <div className={css.imgWrapper}>
                  <img
                    src={user.avatar}
                    alt="User photo"
                    className={css.photo}
                  />
                  <button type="button" className={css.buttonUpload}>
                    {/* <HiArrowDownTray style={{ color: "407BFF" }} /> */}
                    <div className={css.uploadSvg}>
                      <ArrowUpTrayOutline size="16" />
                    </div>
                    Upload a photo
                  </button>
                </div>
                <div className={css.wrapperTwoBlocks}>
                  <div className={css.firstWrapper}>
                    <h3 className={css.genderTitle}>Your gender identity</h3>

                    <div className={css.genderOptions}>
                      <div className={css.genderWrapper}>
                        <input
                          type="radio"
                          name="gender"
                          id="woman"
                          defaultChecked
                        />
                        <label
                          htmlFor="woman"
                          name="gender"
                          className={css.genderInput}
                          value="woman"
                        >
                          Woman
                        </label>
                      </div>
                      <div className={css.genderWrapper}>
                        <input
                          type="radio"
                          name="gender"
                          id="man"
                          value="man"
                        />
                        <label htmlFor="man" className={css.genderInput}>
                          Man
                        </label>
                      </div>
                    </div>

                    <div className={css.userInfo}>
                      <label className={css.labelUserName}>
                        Name
                        <Inputs type="text" name="name" placeholder="Name" />
                        <ErrorMessage name="name" component="span" />
                      </label>

                      <label className={css.labelUser}>
                        {value.email}
                        <Inputs type="email" name="email" placeholder="Email" />
                        {/* <ErrorMessage name="email" component="span" /> */}
                      </label>
                    </div>
                  </div>

                  <div className={css.passwordWrapper}>
                    <h3>Password</h3>
                    <label className={css.labelPassword}>
                      Outdated password:
                      <Inputs
                        type={openPassword ? "text" : "password"}
                        name="outdatedPassword"
                        placeholder="Password"
                      />
                      {openPassword ? (
                        <div
                          className={css.eyeIcon}
                          onClick={handleOpenPassword}
                        >
                          <EyeOutline size="16" />
                        </div>
                      ) : (
                        <div
                          className={css.eyeIcon}
                          onClick={handleOpenPassword}
                        >
                          <EyeSlashOutline size="16" />
                        </div>
                      )}
                      <ErrorMessage name="outdatedPassword" component="span" />
                    </label>

                    <label className={css.labelPassword}>
                      New password:
                      <Inputs
                        type={openPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="Password"
                      />
                      {openPassword ? (
                        <div
                          className={css.eyeIcon}
                          onClick={handleOpenPassword}
                        >
                          <EyeOutline size="16" />
                        </div>
                      ) : (
                        <div
                          className={css.eyeIcon}
                          onClick={handleOpenPassword}
                        >
                          <EyeSlashOutline size="16" />
                        </div>
                      )}
                      <ErrorMessage name="newPassword" component="span" />
                    </label>

                    <label className={css.labelPassword}>
                      Repeat new password:
                      <Inputs
                        type={openPassword ? "text" : "password"}
                        name="repeatNewPassword"
                        placeholder="Password"
                      />
                      {openPassword ? (
                        <div
                          className={css.eyeIcon}
                          onClick={handleOpenPassword}
                        >
                          <EyeOutline size="16" />
                        </div>
                      ) : (
                        <div
                          className={css.eyeIcon}
                          onClick={handleOpenPassword}
                        >
                          <EyeSlashOutline size="16" />
                        </div>
                      )}
                      <ErrorMessage name="repeatNewPassword" component="span" />
                    </label>
                  </div>
                </div>
                <div className={css.btn}>
                  <Button
                    type="submit"
                    cssStyle={css.btn}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </ModalBackdrop>
  );
}
