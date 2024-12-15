import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoIcon from "../ui/icons/LogoIcon";
import css from "./Logo.module.css";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";

const Logo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const targetRoute = isLoggedIn ? "/home" : "/welcome";

  return (
    <Link to={targetRoute} className={css.logo}>
      <LogoIcon />
      <p className={css.iconText}>Tracker of water</p>
    </Link>
  );
};

export default Logo;
