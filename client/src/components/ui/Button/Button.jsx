import React from "react";
import css from "./Button.module.css";

const Button = (props) => {
  const { cssStyle, children, onClick } = props;
  return (
    <button
      className={`${css.button} ${css[cssStyle]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
