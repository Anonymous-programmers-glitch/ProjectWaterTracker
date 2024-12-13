import { resizeWindow } from "../../../utils/resizeWindow";
import css from "./TrackerBenefitsList.module.css";
import React from "react";
export default function TrackerBenefitsList({ data }) {
  const sizeWindow = resizeWindow();
  const isMobile = sizeWindow < 768;
  const size = isMobile ? "32" : "40";
  return (
    <>
      <h3 className={css.titleList}>Tracker Benefits</h3>
      <ul className={css.list}>
        {data.map((item) => {
          return (
            <li key={item.id}>
              <div className={css.item}>
                <div className={css.icon}>
                  {React.cloneElement(item.icon, { size: size })}
                </div>
                {item.text}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
