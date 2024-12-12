import { useNavigate } from "react-router-dom";
import UserOutline from "../ui/icons/UserOutline";
import css from "./UserAuth.module.css";

const UserAuth = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <button className={css.userAuthBtn} onClick={handleSignInClick}>
      <span className={css.userAuthBtnText}>Sign in</span>
      <span className={css.icon}>
        <UserOutline size="28" />
      </span>
    </button>
  );
};

export default UserAuth;
