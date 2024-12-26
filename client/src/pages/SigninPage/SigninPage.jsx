import AuthForm from "../../components/signin/AuthForm/AuthForm.jsx";
import BottleContainer from "../../components/signin/bottle/Bottle.jsx";
import css from "./SigninPage.module.css";

export default function SigninPage() {
  return (
    <section className={css.main}>
      <div className={css.background}></div>
      <div className={css.wrapper}>
        <div className={css.form}>
          <AuthForm />
        </div>
        <div className={css.btl}>
          <BottleContainer />
        </div>
      </div>
    </section>
  );
}
