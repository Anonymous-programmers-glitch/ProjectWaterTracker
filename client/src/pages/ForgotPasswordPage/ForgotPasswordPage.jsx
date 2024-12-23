import { NavLink } from "react-router-dom";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword.jsx";
import css from "./ForgotPasswordPage.module.css";

export default function ForgotPasswordPage() {
  return (
    <section className={css.container}>
      <h3 className={css.title}>Forgot your password?</h3>
      <div className={css.background}></div>
      <div className={css.wrapper}>
        <ForgotPassword />
        <NavLink className={css.link} to="/">
          Back to HomePage
        </NavLink>
      </div>
    </section>
  );
}
