import React from "react";
import { resizeWindow } from '../../../utils/resizeWindow.js';
import css from "./popUpDay.module.css";
import dayjs from "dayjs";

function PopUpDay({ data }) {
  const { date, dailyNorma, percentageConsumed, entries, consumedWaterByDay } =
    data;
let indent;
  let indentLeft;
  const formattedDate = dayjs(date).format("D, MMMM");
  const day = dayjs(date).format("D");
  const sizeWindow = resizeWindow();
  const isMobile = sizeWindow <= 767;
  const isTablet = sizeWindow <= 1440 && sizeWindow > 767;

  if (day>5 && isMobile) {indent = "-130px" }
  if (day>10 && isMobile) {indent = "-60px" }
  if (day>15 && isMobile) {indent = "10px" }
  if (day>20 && isMobile) {indent = "80px" }
  if (day>25 && isMobile) {indent = "150px" }
  if (day>30 && isMobile) {indent = "220px" }
  if (day>5 && isTablet) {indentLeft = "-250px" }
  if (day>10 && isTablet) {indentLeft = "20px" }
  if (day>15 && isTablet) {indentLeft = "-250px" }
  if (day>20 && isTablet) {indentLeft = "20px" }
  if (day>25 && isTablet) {indentLeft = "-250px" }
  if (day>30 && isTablet) {indentLeft = "20px" }


  return (
    <div className={css.popUp} style={{top:indent, left:indentLeft}}>
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
