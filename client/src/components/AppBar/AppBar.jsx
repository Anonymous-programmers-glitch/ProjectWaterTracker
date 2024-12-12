import Logo from "../Logo/Logo";
import UserLogo from "../UserLogo/UserLogo";
import UserAuth from "../UserAuth/UserAuth";
import css from "./AppBar.module.css";

const AppBar = () => {
  // const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    // <header className={css.header}>
    <header className={css.header}>
      <Logo />
      {/* {isLoggedIn ? <UserLogo /> : <UserAuth />} */}
      <UserLogo />
      <UserAuth />
    </header>
  );
};

export default AppBar;
