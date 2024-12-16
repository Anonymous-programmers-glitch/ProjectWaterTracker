import SignInForm from "../../components/signin/form/signInForm.jsx";
import BottleContainer from "../../components/signin/bottle/bottle.jsx";
import css from "./signin.module.css";

export default function SignInPage() {
  return (
    <section className={css.main}>
      <div className={css.form}>
        <SignInForm />
      </div>
      <div className={css.btl}>
        <BottleContainer />
      </div>
    </section>
  );
}
