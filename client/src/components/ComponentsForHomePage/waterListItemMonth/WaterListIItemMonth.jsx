import clsx from "clsx";
import { useRef, useState } from "react";
import PopUpDay from "../popUp/popUpDay.jsx";
import css from "./waterlistitemmonth.module.css";
import dayjs from "dayjs";

function WaterListIItemMonth(item) {
  const [pointerIsOver, setPointerIsOver] = useState(null);
  const refDay = useRef(null);
  const { id, date, percentageConsumed } = item.item;
  const day = date.split("-")[2];
  const currentDay = dayjs().format("D");
  return (
    <li key={id} className={css.item}>
      <p
        ref={refDay}
        onPointerEnter={() => setPointerIsOver(refDay.current.innerText)}
        onPointerLeave={() => setPointerIsOver(null)}
        className={clsx(
          css.day,
          Number(percentageConsumed) < 100 && css.border,
          currentDay === day && css.dayToday
        )}
      >
        {day}
      </p>
      <p className={css.percent}>{percentageConsumed}%</p>
      {pointerIsOver && <PopUpDay data={item.item} />}
    </li>
  );
}

export default WaterListIItemMonth;
