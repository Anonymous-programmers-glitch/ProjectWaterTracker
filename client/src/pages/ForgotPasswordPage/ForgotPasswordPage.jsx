import { NavLink } from "react-router-dom";
import AuthForm from "../../components/ForgotPassword/AuthForm.jsx";
import css from "./ForgotPasswordPage.module.css";

export default function ForgotPasswordPage() {
  return (
    <section className={css.container}>
      <h3 className={css.title}>Forgot your password?</h3>
      <div className={css.background}></div>
      <div className={css.wrapper}>
        <AuthForm />
        <NavLink className={css.link} to="/">
          Back to HomePage
        </NavLink>
      </div>
    </section>
  );
}
