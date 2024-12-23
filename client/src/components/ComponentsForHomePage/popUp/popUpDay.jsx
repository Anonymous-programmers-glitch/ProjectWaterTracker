import React from "react";
import css from "./popUpDay.module.css";
import dayjs from "dayjs";

function PopUpDay({ data }) {
  const { date, dailyNorma, percentageConsumed, entries, consumedWaterByDay } =
    data;

  const formattedDate = dayjs(date).format("D, MMMM");

  return (
    <div className={css.popUp}>
      <p className={css.date}>{formattedDate}</p>
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
