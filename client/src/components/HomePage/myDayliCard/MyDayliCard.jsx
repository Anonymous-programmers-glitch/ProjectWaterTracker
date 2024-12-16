import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/authSlice.js";
import css from "./mydailycard.module.css";

function MyDailyCard() {
  const dayliNorma = useSelector(selectUser);
  console.log(dayliNorma);
  return (
    <div className={css.card}>
      <p className={css.title}>My daily norma</p>
      <div className={css.cardfooter}>
        <p className={css.text}>1.5 L</p>
        <button className={css.button}>Edit</button>
      </div>
    </div>
  );
}

export default MyDailyCard;
