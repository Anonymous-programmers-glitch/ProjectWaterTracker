import { useSelector } from "react-redux";
import { selectError } from "../../redux/user/selectors.js";
import AuthForm from "../../components/signup/AuthForm/AuthForm.jsx";
import BottleContainer from "../../components/signup/bottle/Bottle.jsx";
import css from "./SignupPage.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const onError = useSelector(selectError);
  console.log(onError);

  switch (onError) {
    case "409":
      toast.error("Email in use!");
      break;
    case "400":
      toast.error("Invalid input data!");
      break;
    default:
      toast.error("Internal server error!");
      break;
  }

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
