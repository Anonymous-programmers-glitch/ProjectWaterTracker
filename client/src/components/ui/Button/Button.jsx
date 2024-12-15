import clsx from "clsx";
import React from "react";
import clsx from "clsx";
import css from "./Button.module.css";

const Button = (props) => {
  const { cssstyle, children, onClick } = props;

  return (
    <button
      className={clsx(css.button, css[cssstyle])}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
