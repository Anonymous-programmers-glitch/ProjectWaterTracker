import React from "react";
import css from "./TextButton.module.css";

const TextButton = (props) => {
  const { children, onClick } = props;
  return (
    <button className={`${css.button}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
export default TextButton;
