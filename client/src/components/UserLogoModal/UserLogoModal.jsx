import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import CogToothOutline from "../ui/icons/CogToothOutline";
import ArrowRightOnRectangle from "../ui/icons/ArrowRightOnRectangle";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
import {
  openSettingModal,
  closeSettingModal,
  openLogoutModal,
  closeLogoutModal,
  selectSettingModal,
  selectLogoutModal,
} from "../../redux/modalSlice/modalSlice";

import css from "./UserLogoModal.module.css";

Modal.setAppElement("#root");

const UserLogoModal = ({ isOpen, onClose, targetRef }) => {
  if (!isOpen || !targetRef.current) return null;

  const dispatch = useDispatch();
  // const [isSettingOpen, setIsSettingOpen] = useState(false);
  // const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const isSettingModalOpen = useSelector(selectSettingModal);
  const isLogoutModalOpen = useSelector(selectLogoutModal);

  // const openModal = (setState) => {
  //   setState(true);
  //   console.log("Modal state updated"); // Додано для перевірки
  //   onClose();
  // };

  const handleOpenSettingModal = () => {
    dispatch(openSettingModal());
    onClose();
  };
  const handleOpenLogoutModal = () => {
    onClose();
    dispatch(openLogoutModal());
  };

  const getModalPosition = () => {
    const rect = targetRef.current.getBoundingClientRect();
    return {
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left + window.scrollX + 4}px`,
    };
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldFocusAfterRender={true}
        className={css.modal}
        style={{
          content: {
            ...getModalPosition(),
          },
          overlay: null,
        }}
      >
        <button
          // onClick={() => openModal(setIsSettingOpen)}
          onClick={handleOpenSettingModal}
          className={css.modalBtn}
        >
          <div className={css.modalWrapper}>
            <div className={css.icon}>
              <CogToothOutline size="16" color="#407BFF" />
            </div>
            <span className={css.modalText}>Setting</span>
          </div>
        </button>

        <button
          // onClick={() => openModal(setIsLogoutOpen)}
          onClick={handleOpenLogoutModal}
          className={css.modalBtn}
        >
          <div className={css.modalWrapper}>
            <div className={css.icon}>
              <ArrowRightOnRectangle size="16" color="#407BFF" />
            </div>
            <span className={css.modalText}>Log out</span>
          </div>
        </button>

        {/* <SettingModal
          isOpen={isSettingModalOpen}
          onClose={() => setIsSettingOpen(false)}
          onClose={closeSettingModal}
        /> */}
      </Modal>
      <UserLogoutModal
        isOpen={isLogoutModalOpen}
        // onClose={() => setIsLogoutOpen(false)}
        onClose={() => dispatch(closeLogoutModal())}
      />
    </>
  );
};

export default UserLogoModal;
