import css from "./waterlisttoday.module.css";

function WaterListToday({ children }) {
  return <ul className={css.list}>{children}</ul>;
}

export default WaterListToday;
