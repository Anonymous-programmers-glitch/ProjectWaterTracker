import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "react-hot-toast";
import css from "./SettingModal.module.css";
import { useDispatch } from "react-redux";
// import user from "../../testUser.json";
import Button from "../ui/Button/Button.jsx";
import Inputs from "../ui/Inputs/Inputs.jsx";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop.jsx";
import { useState, useEffect, useCallback } from "react";
import { selectAvatarUrl, selectUser } from "../../redux/user/selectors.js";
import { useSelector } from "react-redux";
// import { updateUser } from "../../redux/settings/operations.js";
import MarkOutline from "../ui/icons/XMarkOutline.jsx";
import EyeOutline from "../../components/ui/icons/EyeOutline.jsx";
import EyeSlashOutline from "../ui/icons/EyeSlashOutline.jsx";
import ArrowUpTrayOutline from "../ui/icons/ArrowUpTrayOutline.jsx";
import { closeSettingModal } from "../../redux/modalToggle/slice.js";
import { selectSettingModal } from "../../redux/modalToggle/selectors.js";
import { update, updateAvatar } from "../../redux/user/operations.js";
// import isLoading from "../../redux/user/selectors.js";

const FeedbackSchema = Yup.object().shape({
  gender: Yup.string().oneOf(
    ["female", "male"],
    "Please select a valid gender."
  ),
  name: Yup.string().max(12, "Name is Too Long."),
  email: Yup.string().email().required("Email is Required."),
  outdatedPassword: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(64, "Password must be at most 64 characters long.")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .matches(
      /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain a special character."
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter."
    ),
  newPassword: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(64, "Password must be at most 64 characters long.")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .matches(
      /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain a special character."
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter."
    ),
  repeatNewPassword: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(64, "Password must be at most 64 characters long.")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .matches(
      /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain a special character."
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter."
    ),
});

export default function SettingModal() {
  const [selectedFile, setSelectedFile] = useState(null);
  //для фото сейв
  // const [isPhotoDirty, setIsPhotoDirty] = useState(false);
  //
  // const [preview, setPreview] = useState(user?.avatarUrl || null);
  //
  const value = useSelector(selectUser);
  const avatar = useSelector(selectAvatarUrl);
  console.log(avatar);

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
    // password: "",
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
    //тост без змін
    // if (!dirty && !isPhotoDirty && !selectedFile) {
    //   toast.info("No changes were made.", { autoClose: 2000 });
    //   dispatch(closeSettingModal());
    // }
    //

    // const { dirty, isValid } = actions; //

    // if (!dirty || !isValid) {
    //   toast.info("No changes were made.", { autoClose: 2000 });
    //   return;
    // }

    const updatedValues = {};

    if (values.newPassword !== values.repeatNewPassword) {
      toast.error("New passwords don't match.", {
        autoClose: 2000,
      });
      return;
    }

    if (
      values.outdatedPassword &&
      (values.outdatedPassword === values.newPassword ||
        values.outdatedPassword === values.repeatNewPassword)
    ) {
      toast.error("Old password cannot be the same as new passwords.", {
        autoClose: 2000,
      });
      return;
    }

    Object.keys(values).forEach((key) => {
      if (values[key] !== initialValues[key]) {
        updatedValues[key] = values[key];
      }
    });

    try {
      if (updatedValues.outdatedPassword && updatedValues.newPassword) {
        const passwordPayload = {
          outdatedPassword: updatedValues.outdatedPassword,
          newPassword: updatedValues.newPassword,
        };

        await dispatch(update(passwordPayload));
        console.log("Пароль оновлено:", passwordPayload);
        delete updatedValues.outdatedPassword;
        delete updatedValues.newPassword;
        delete updatedValues.repeatNewPassword;
      }

      const otherFields = Object.keys(updatedValues).filter(
        (key) => key !== "outdatedPassword" && key !== "newPassword"
      );

      if (otherFields.length > 0) {
        const otherPayload = otherFields.reduce((acc, key) => {
          acc[key] = updatedValues[key];
          return acc;
        }, {});

        await dispatch(update(otherPayload));
      }

      toast.success("Successfully updated!", {
        autoClose: 3000,
      });

      setTimeout(() => {
        dispatch(closeSettingModal());
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong: ", {
        autoClose: 2000,
      });

      console.error(error);
    }

    actions.resetForm();
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      //для фото сейв
      // setIsPhotoDirty(true);
      //
    }
  };

  const handleButtonClick = () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("avatarUrl", selectedFile);
        dispatch(updateAvatar(formData));
      } catch (error) {
        console.error("Failed to upload avatar:", error);
      } finally {
        setSelectedFile(null);
      }
    } else {
      document.getElementById("avatarInput").click();
    }
  };

  return (
    <ModalBackdrop onClick={() => dispatch(closeSettingModal())}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          {/* {({ dirty, isValid }) => ( */}
          <Form className={css.formWrapper}>
            <h2 className={css.mainTitle}>Settings</h2>
            <div className={css.wrapperToBtn}>
              {/* <HiXMark
                  className={css.closeBtn}
                  size={24}
                  onClick={handleCloseModal}
                /> */}
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
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : value.avatarUrl
                    }
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
                  // onClick={() => document.getElementById("avatarInput").click()}
                >
                  {/* <HiArrowDownTray style={{ color: "407BFF" }} /> */}
                  <div className={css.uploadSvg}>
                    <ArrowUpTrayOutline
                      size="16"
                      className={css.ArrowOutline}
                    />
                  </div>
                  {selectedFile ? "Click to upload" : "Upload a photo"}
                  {/* Upload a photo */}
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
                        // value="woman"
                      >
                        Woman
                      </label>
                    </div>
                    <div className={css.genderWrapper}>
                      <Field
                        type="radio"
                        name="gender"
                        id="man"
                        // value="man"
                        value="male"
                      />
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
                      {/* <ErrorMessage name="name" component="span" /> */}
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
                      {/* <ErrorMessage name="email" component="span" /> */}
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
                      // name="outdatedPassword"
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
                    {/* <ErrorMessage name="outdatedPassword" component="span" /> */}
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
                    {/* <ErrorMessage name="newPassword" component="span" /> */}
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
                    {/* <ErrorMessage name="repeatNewPassword" component="span" /> */}
                  </label>
                </div>
              </div>
              {/* <div className={css.btn}> */}

              <Button
                type="submit"
                cssstyle={css.btn}
                className={css.btn}
                // disabled={!dirty || !isValid}
                //для фото сейв
                // disabled={!(dirty || isPhotoDirty || selectedFile) || !isValid}
                //
                // onClick={handleSubmit}
              >
                Save
              </Button>

              {/* </div> */}
            </div>
          </Form>
          {/* )} */}
        </Formik>
        <Toaster />
      </div>
    </ModalBackdrop>
  );
}
