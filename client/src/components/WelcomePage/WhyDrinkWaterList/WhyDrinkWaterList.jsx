import Point from "../../ui/icons/point";
import css from "./WhyDrinkWaterList.module.css";
export default function WhyDrinkWaterList({ data }) {
  return (
    <div className={css.listWrapper}>
      <h3 className={css.titleList}>Why drink water</h3>
      <ul className={css.list}>
        {data.map((item) => {
          return (
            <li className={css.item} key={item.id}>
              <Point size={8} />
              <div className={css.text}>{item.text}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
