import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/authSlice.js";
import css from "./mydailycard.module.css";

function MyDailyCard() {
  const { dailyNorma } = useSelector(selectUser);
  return (
    <div className={css.card}>
      <p className={css.title}>My daily norma</p>
      <div className={css.cardfooter}>
        <p className={css.text}>{dailyNorma / 1000} L</p>
        <button className={css.button}>Edit</button>
      </div>
    </div>
  );
}

export default MyDailyCard;
