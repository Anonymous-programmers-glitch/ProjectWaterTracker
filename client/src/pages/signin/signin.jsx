import SignInForm from "../../components/signin/form/signInForm.jsx";
import BottleContainer from "../../components/signin/bottle/bottle.jsx";
import css from "./signin.module.css";

export default function SignInPage() {
  return (
    <div className={css.main}>
      <SignInForm className={(css.form, css.box)} />
      <div className={(css.btlcontainer, css.box)}>
        <BottleContainer className={css.bottle} />
      </div>
    </div>
  );
}
