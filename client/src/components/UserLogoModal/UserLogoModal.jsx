import { useDispatch } from "react-redux";
import CogToothOutline from "../ui/icons/CogToothOutline";
import ArrowRightOnRectangle from "../ui/icons/ArrowRightOnRectangle";

import {
  openLogoutModal,
  openSettingModal,
} from "../../redux/modalToggle/slice";
import css from "./UserLogoModal.module.css";

const UserLogoModal = () => {
  const dispatch = useDispatch();

  return (
    <div className={css.modal}>
      <button
        onClick={() => dispatch(openSettingModal())}
        className={css.modalBtn}
      >
        <div className={css.icon}>
          <CogToothOutline size="16" color="currentColor" />
        </div>
        <p className={css.modalText}>Setting</p>
      </button>

      <button
        onClick={() => dispatch(openLogoutModal())}
        className={css.modalBtn}
      >
        <div className={css.icon}>
          <ArrowRightOnRectangle size="16" color="currentColor" />
        </div>
        <p className={css.modalText}>Log out</p>
      </button>
    </div>
  );
};

export default UserLogoModal;
