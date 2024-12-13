import Logo from "../Logo/Logo";
import UserLogo from "../UserLogo/UserLogo";
import UserAuth from "../UserAuth/UserAuth";
import css from "./AppBar.module.css";

const AppBar = () => {
  // const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const isLoggedIn = true;

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
