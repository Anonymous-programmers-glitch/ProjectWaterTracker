import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";



const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <div className={css.background}></div>
      
      <h1 className={css.title} >404 - Page Not Found</h1>
      <p className={css.text} >The page you are looking for does not exist.</p>
      <Link className={css.link}  to="/">Go to Home Page</Link>
    </div>
  );
};
export default NotFoundPage;


