import { useEffect } from "react";
import { useNavigate } from "react-router";
import css from "./SuccessPage.module.css";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={css.container}>
      <div className={css.background}></div>
      <h1 className={css.title}>Verification successful!</h1>
      <p className={css.text}>
        In a few seconds you will be redirected to the login page...
      </p>
    </div>
  );
};

export default SuccessPage;
