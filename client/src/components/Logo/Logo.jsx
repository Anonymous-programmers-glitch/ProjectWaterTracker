import { Link } from "react-router-dom";
import LogoIcon from "../ui/icons/LogoIcon";
import { useState } from "react";
import css from "./Logo.module.css";

const Logo = () => {
  // const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { isLoggedIn, setisLoggedIn } = useState(true);

  const targetRoute = isLoggedIn ? "/home" : "/welcome";

  return (
    <Link to={targetRoute} className={css.logo}>
      <LogoIcon />
      <p className={css.iconText}>Tracker of water</p>
    </Link>
  );
};

export default Logo;
