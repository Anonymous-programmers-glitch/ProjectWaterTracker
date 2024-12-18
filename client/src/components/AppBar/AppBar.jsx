import Logo from "../Logo/Logo";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.jsx";
import UserLogo from "../UserLogo/UserLogo";
import UserAuth from "../UserAuth/UserAuth";
import css from "./AppBar.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";

const AppBar = () => {

  // const isLoggedIn = useAppSelector(selectIsLoggedIn);


  // return (
  //   <header className={css.header}>
  //     <Logo />
    {/* {isLoggedIn ? <UserLogo /> : <UserAuth />} */}

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
        {isLoggedIn ? <UserLogo /> : <UserAuth />}
        <ThemeSwitcher />
      </div>

    </header>

  );
};

export default AppBar;
