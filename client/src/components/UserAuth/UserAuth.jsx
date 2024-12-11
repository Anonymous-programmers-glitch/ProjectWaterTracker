import { useNavigate } from "react-router-dom";

const UserAuth = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <button className="user-auth" onClick={handleSignInClick}>
      Sign In
    </button>
  );
};

export default UserAuth;
