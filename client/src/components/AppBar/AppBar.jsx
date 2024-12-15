import Logo from "../Logo/Logo";
import UserLogo from "../UserLogo/UserLogo";
import UserAuth from "../UserAuth/UserAuth";
import css from "./AppBar.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
        {isLoggedIn ? <UserLogo /> : <UserAuth />}
      </div>
    </header>
  );
};

export default AppBar;
