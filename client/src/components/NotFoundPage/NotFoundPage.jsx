import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import Bottle from "../HomePage/bottle";


const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <div className={css.background}></div>
      
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className={css.link}  to="/">Go to Home Page</Link>
    </div>
  );
};
export default NotFoundPage;


