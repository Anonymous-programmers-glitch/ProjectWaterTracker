import SignUpForm from "../../components/signup/form/signUpForm.jsx";
import BottleContainer from "../../components/signup/bottle/bottle.jsx";
import css from "./signup.module.css";

export default function SignUpPage() {
  return (
    <section className={css.main}>
      <div className={css.form}>
        <SignUpForm />
      </div>
      <div className={css.btl}>
        <BottleContainer />
      </div>
    </section>
  );
}
