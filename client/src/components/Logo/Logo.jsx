import { Link } from "react-router-dom";
import logo from "../../../public/assets/Logo.png";
import { useState } from "react";

const Logo = () => {
  // const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { isLoggedIn, setisLoggedIn } = useState(true);

  const targetRoute = isLoggedIn ? "/home" : "/welcome";

  return (
    <Link to={targetRoute} className="logo">
      <img src={logo} alt="Water tracker logo" />
    </Link>
  );
};

export default Logo;
