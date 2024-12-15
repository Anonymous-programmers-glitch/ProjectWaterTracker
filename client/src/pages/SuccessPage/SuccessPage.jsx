import { useEffect } from "react";
import { useNavigate } from "react-router";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-page">
      <h1>Verification successful!</h1>
      <p>In a few seconds you will be redirected to the login page...</p>
    </div>
  );
};

export default SuccessPage;
