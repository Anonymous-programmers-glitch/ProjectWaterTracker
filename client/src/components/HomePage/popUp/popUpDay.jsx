import React from "react";
import css from "./popUpDay.module.css";

function PopUpDay({ data }) {
  return (
    <div className={css.popUp}>
      <p className={css.date}>{data.pointerIsOver}</p>
      <p className={css.text}>
        Daily norma: <span className={css.data}> 1.5 L</span>
      </p>
      <p className={css.text}>
        Fulfillment of the daily norm:
        <span className={css.data}> {data.percent}%</span>
      </p>
      <p className={css.text}>
        How many servings of water:
        <span className={css.data}> {data.pointerIsOver}</span>
      </p>
    </div>
  );
}

export default PopUpDay;
