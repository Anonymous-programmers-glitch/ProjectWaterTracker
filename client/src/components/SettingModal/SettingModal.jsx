import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import css from "./SettingModal.module.css";
import { useDispatch } from "react-redux";
import Button from "../ui/Button/Button.jsx";
import Inputs from "../ui/Inputs/Inputs.jsx";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop.jsx";
import { useState, useEffect, useCallback } from "react";
import { selectAvatarUrl, selectUser } from "../../redux/user/selectors.js";
import { useSelector } from "react-redux";
import MarkOutline from "../ui/icons/XMarkOutline.jsx";
import EyeOutline from "../../components/ui/icons/EyeOutline.jsx";
import EyeSlashOutline from "../ui/icons/EyeSlashOutline.jsx";
import ArrowUpTrayOutline from "../ui/icons/ArrowUpTrayOutline.jsx";
import { closeSettingModal } from "../../redux/modalToggle/slice.js";
import { selectSettingModal } from "../../redux/modalToggle/selectors.js";
import { update, updateAvatar } from "../../redux/user/operations.js";
import { updateNotifier } from "../../utils/updateNotifier.js";

const FeedbackSchema = Yup.object().shape({
  gender: Yup.string().oneOf(
    ["female", "male"],
    "Please select a valid gender."
  ),
  name: Yup.string().max(32, "Name is too long!"),
  email: Yup.string().email().required("Email is required!"),
  outdatedPassword: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum!")
    .max(64, "Password must be at most 64 characters long!")
    .matches(/(?=.*[0-9])/, "Password must contain a number!")
    .matches(
      /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain a special character!"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter!"
    ),
  newPassword: Yup.string()
    .nullable()
    .when("outdatedPassword", {
      is: (outdatedPassword) => !!outdatedPassword,
      then: (schema) =>
        schema
          .min(8, "Password is too short - should be 8 chars minimum!")
          .max(64, "Password must be at most 64 characters long!")
          .matches(/(?=.*[0-9])/, "Password must contain a number!")
          .matches(
            /(?=.*[!@#$%^&*(),.?":{}|<>])/,
            "Password must contain a special character!"
          )
          .matches(
            /^(?=.*[A-Z])/,
            "Password must contain at least one uppercase letter!"
          )
          .notOneOf(
            [Yup.ref("outdatedPassword")],
            "New password must not match the outdated password!"
          ),
      otherwise: (schema) => schema.nullable(),
    }),
  repeatNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword")],
    "New passwords must match!"
  ),
});

export default function SettingModal() {
  const [selectedFile] = useState(null);
  const value = useSelector(selectUser);
  const avatar = useSelector(selectAvatarUrl);

  const [openPassword, setOpenPassword] = useState(false);

  const isSettingsOpen = useSelector(selectSettingModal);
  const dispatch = useDispatch();

  const initialValues = {
    name: value?.name || "",
    email: value?.email || "",
    gender: value?.gender || "female",
    outdatedPassword: "",
    newPassword: "",
    repeatNewPassword: "",
    avatarUrl: avatar || null,
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        dispatch(closeSettingModal());
      }
    },
    [dispatch]
  );

  const handleOpenPassword = () => {
    setOpenPassword((prev) => !prev);
  };

  const handleSubmit = async (values, actions) => {
    const { repeatNewPassword, avatarUrl, ...filteredValues } = values;

    await updateNotifier({
      dispatchAction: (vals) => dispatch(update(vals)),
      values: filteredValues,
      closeModal: () => dispatch(closeSettingModal()),
      resetForm: actions?.resetForm,
      status: 200,
    });
  };

  useEffect(() => {
    if (isSettingsOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isSettingsOpen, handleKeyDown]);

  if (!isSettingsOpen) return null;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatarUrl", file);

      await updateNotifier({
        dispatchAction: (vals) => dispatch(updateAvatar(vals)),
        values: formData,
        status: 200,
      });
    }
  };

  const handleButtonClick = () => {
    document.getElementById("avatarInput").click();
  };

  return (
    <ModalBackdrop onClick={() => dispatch(closeSettingModal())}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          <Form className={css.formWrapper}>
            <h2 className={css.mainTitle}>Settings</h2>
            <div className={css.wrapperToBtn}>
              <div
                className={css.closeBtn}
                onClick={() => dispatch(closeSettingModal())}
              >
                <MarkOutline />
              </div>

              <h3 className={css.photoTitle}>Your photo</h3>
              <div className={css.imgWrapper}>
                {selectedFile || value.avatarUrl ? (
                  <img
                    src={value.avatarUrl}
                    alt="User photo"
                    className={css.photo}
                  />
                ) : (
                  <div className={css.spanValue}>
                    {(value.name || value.email[0]).charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  type="button"
                  className={css.buttonUpload}
                  onClick={handleButtonClick}
                >
                  <div className={css.uploadSvg}>
                    <ArrowUpTrayOutline
                      size="16"
                      className={css.ArrowOutline}
                    />
                  </div>
                  {selectedFile ? "Click to upload" : "Upload a photo"}
                  <input
                    id="avatarInput"
                    type="file"
                    name="avatar"
                    //
                    onChange={handleFileChange}
                    //
                    className={css.uploadPhotoInput}
                  />
                </button>
              </div>

              <div className={css.wrapperTwoBlocks}>
                <div className={css.firstWrapper}>
                  <h3 className={css.genderTitle}>Your gender identity</h3>

                  <div className={css.genderOptions}>
                    <div className={css.genderWrapper}>
                      <Field
                        type="radio"
                        name="gender"
                        id="woman"
                        value="female"
                      />
                      <label
                        htmlFor="woman"
                        name="gender"
                        className={css.genderInput}
                      >
                        Woman
                      </label>
                    </div>
                    <div className={css.genderWrapper}>
                      <Field type="radio" name="gender" id="man" value="male" />
                      <label
                        htmlFor="man"
                        name="gender"
                        className={css.genderInput}
                      >
                        Man
                      </label>
                    </div>
                  </div>

                  <div className={css.userInfo}>
                    <label className={css.labelUserName} htmlFor="name">
                      Name
                      <Inputs
                        type="text"
                        name="name"
                        placeholder="Name"
                        id="name"
                        className={css.nameAndEmailInput}
                      >
                        {value.name}
                      </Inputs>
                    </label>

                    <label className={css.labelUser} htmlFor="email">
                      Email
                      <Inputs
                        type="email"
                        name="email"
                        placeholder="Email"
                        id="email"
                        className={css.nameAndEmailInput}
                      >
                        {value.email}
                      </Inputs>
                    </label>
                  </div>
                </div>

                <div className={css.passwordWrapper}>
                  <h3 className={css.passwordTittle}>Password</h3>
                  <label
                    className={css.labelPassword}
                    htmlFor="outdatedPassword"
                  >
                    Outdated password:
                    <Inputs
                      type={openPassword ? "text" : "password"}
                      name="outdatedPassword"
                      placeholder="Password"
                      id="outdatedPassword"
                      className={css.input}
                    />
                    {openPassword ? (
                      <div className={css.eyeIcon} onClick={handleOpenPassword}>
                        <EyeOutline size="16" />
                      </div>
                    ) : (
                      <div className={css.eyeIcon} onClick={handleOpenPassword}>
                        <EyeSlashOutline size="16" />
                      </div>
                    )}
                  </label>

                  <label className={css.labelPassword} htmlFor="newPassword">
                    New password:
                    <Inputs
                      type={openPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="Password"
                      id="newPassword"
                      className={css.input}
                    />
                    {openPassword ? (
                      <div className={css.eyeIcon} onClick={handleOpenPassword}>
                        <EyeOutline size="16" />
                      </div>
                    ) : (
                      <div className={css.eyeIcon} onClick={handleOpenPassword}>
                        <EyeSlashOutline size="16" />
                      </div>
                    )}
                  </label>

                  <label
                    className={css.labelPassword}
                    htmlFor="repeatNewPassword"
                  >
                    Repeat new password:
                    <Inputs
                      type={openPassword ? "text" : "password"}
                      name="repeatNewPassword"
                      placeholder="Password"
                      id="repeatNewPassword"
                      className={css.input}
                    />
                    {openPassword ? (
                      <div className={css.eyeIcon} onClick={handleOpenPassword}>
                        <EyeOutline size="16" />
                      </div>
                    ) : (
                      <div className={css.eyeIcon} onClick={handleOpenPassword}>
                        <EyeSlashOutline size="16" />
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div className={css.saveBtnWrapper}>
                <Button type="submit" cssstyle={css.btn} className={css.btn}>
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </ModalBackdrop>
  );
}
