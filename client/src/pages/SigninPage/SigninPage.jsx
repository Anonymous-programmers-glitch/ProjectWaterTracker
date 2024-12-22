import AuthForm from "../../components/signin/AuthForm/AuthForm.jsx";
import BottleContainer from "../../components/signin/bottle/Bottle.jsx";
import css from "./SigninPage.module.css";
import { Toaster } from "react-hot-toast";

export default function SigninPage() {
  return (
    <section className={css.main}>
      <div className={css.background}></div>
      <Toaster position="top-center" />
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
