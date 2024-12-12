import clsx from "clsx";
import { useRef, useState } from "react";
import css from "./waterlistitemmonth.module.css";

function WaterListIItemMonth({ item }) {
  const [pointerIsOver, setPointerIsOver] = useState(null);
  const refDay = useRef(null);
  const { id, day, percent } = item;
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
      {pointerIsOver && (
        <div className={css.popUp}>
          <p>{pointerIsOver}</p>
          <p>Daily norma:</p>
          <p>Fulfillment of the daily norm: {percent}</p>
          <p>How many servings of water:</p>
        </div>
      )}
    </li>
  );
}

export default WaterListIItemMonth;
