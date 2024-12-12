import clsx from "clsx";
import { useRef, useState } from "react";
import PopUpDay from "../popUp/popUpDay.jsx";
import css from "./waterlistitemmonth.module.css";

function WaterListIItemMonth({ item }) {
  const [pointerIsOver, setPointerIsOver] = useState(null);
  const refDay = useRef(null);
  const { id, date, percent } = item;
  const day = date.split("-")[0];

  return (
    <li key={id} className={css.item}>
      <p
        ref={refDay}
        onPointerEnter={() => setPointerIsOver(refDay.current.innerText)}
        onPointerLeave={() => setPointerIsOver(null)}
        className={clsx(css.day, Number(percent) < 100 && css.border)}
      >
        {day}
      </p>
      <p className={css.percent}>{percent}%</p>
      {pointerIsOver && <PopUpDay data={{ pointerIsOver, percent }} />}
    </li>
  );
}

export default WaterListIItemMonth;
