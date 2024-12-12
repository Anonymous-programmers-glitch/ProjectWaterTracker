import css from "./Inputs.module.css";
import { Field, ErrorMessage } from "formik";

const Inputs = (props) => {
  const { type, name, placeholder } = props;

  return (
    <div>
      <Field
        type={type}
        className={css.field}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="span" className={css.error} />
    </div>
  );
};
export default Inputs;
