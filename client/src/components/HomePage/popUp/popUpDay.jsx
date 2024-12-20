import React from "react";
import css from "./popUpDay.module.css";

function PopUpDay({ data }) {
  const { date, dailyNorma, percentageConsumed, entries, consumedWaterByDay } =
    data;

  return (
    <div className={css.popUp}>
      <p className={css.date}>{date}</p>
      <p className={css.text}>
        Daily norma:{" "}
        <span className={css.data}> {Number(dailyNorma) / 1000} L</span>
      </p>
      <p className={css.text}>
        Fulfillment of the daily norm:
        <span className={css.data}> {percentageConsumed}%</span>
      </p>
      <p className={css.text}>
        How many servings of water:
        <span className={css.data}> {entries}</span>
      </p>
    </div>
  );
}

export default PopUpDay;
