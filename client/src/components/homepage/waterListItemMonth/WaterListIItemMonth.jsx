import clsx from "clsx";
import css from "./waterlistitemmonth.module.css";

function WaterListIItemMonth({ item }) {
  const { day, percent } = item;
  return (
    <li className={css.item}>
      <p className={clsx(css.day, Number(percent) < 100 && css.border)}>
        {day}
      </p>
      <p className={css.percent}>{percent}%</p>
    </li>
  );
}

export default WaterListIItemMonth;
