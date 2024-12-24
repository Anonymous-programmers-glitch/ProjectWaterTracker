import css from "./Inputs.module.css";
import { Field, ErrorMessage } from "formik";

const Inputs = (props) => {
  const { type, name, placeholder, className, min, max, step } = props;

  return (
    <div>
      <Field
        type={type}
        className={`${css.field} ${className}`}
        name={name}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
      />
      <ErrorMessage name={name} component="span" className={css.errormes} />
    </div>
  );
};
export default Inputs;
