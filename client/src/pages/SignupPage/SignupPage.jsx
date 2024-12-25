import AuthForm from "../../components/signup/AuthForm/AuthForm.jsx";
import BottleContainer from "../../components/signup/bottle/Bottle.jsx";
import css from "./SignupPage.module.css";
import { Toaster } from "react-hot-toast";

export default function SignupPage() {
  return (
    <section className={css.main}>
      <div className={css.background}></div>
      {/* <Toaster position="top-center" /> */}
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
