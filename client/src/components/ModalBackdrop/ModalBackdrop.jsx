import css from "./ModalBackdrop.module.css";

const ModalBackdrop = ({ onClick, children }) => {


  return (
    <div className={css.modalbackdrop} onClick={onClick}>
      {children}
    </div>
  );
};

export default ModalBackdrop;
