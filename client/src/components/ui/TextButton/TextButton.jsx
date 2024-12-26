import css from "./TextButton.module.css";

const TextButton = (props) => {
  const { children, onClick, clas } = props;
  return (
    <button className={`${css.button} ${clas}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
export default TextButton;
