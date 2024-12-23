import { useDispatch, useSelector } from "react-redux";
import { openDailyNormaModal } from "../../../redux/modalToggle/slice.js";
import { selectUser } from "../../../redux/user/selectors";
import TextButton from '../../ui/TextButton/TextButton.jsx';
import css from "./mydailycard.module.css";

function MyDailyCard() {
  const { dailyNorma } = useSelector(selectUser);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(openDailyNormaModal());
  }

  return (
    <div className={css.card}>
      <p className={css.title}>My daily norma</p>
      <div className={css.cardfooter}>
        <p className={css.text}>{dailyNorma / 1000} L</p>
        <TextButton clas={css.button} onClick={handleClick}>
          Edit
        </TextButton>
      </div>
    </div>
  );
}

export default MyDailyCard;
