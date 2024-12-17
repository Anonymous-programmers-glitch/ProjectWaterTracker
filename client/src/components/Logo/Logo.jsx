import { Link } from "react-router-dom";
import LogoIcon from "../ui/icons/LogoIcon";
import css from "./Logo.module.css";

const Logo = () => {
  return (
    <Link to="/" className={css.logo}>
      <LogoIcon />
      <p className={css.iconText}>Tracker of water</p>
    </Link>
  );
};

export default Logo;
