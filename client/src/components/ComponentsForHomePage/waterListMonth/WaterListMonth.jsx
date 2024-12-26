import css from "./waterlistmonth.module.css";

function WaterListMonth({ children }) {
  return <ul className={css.list}>{children}</ul>;
}

export default WaterListMonth;
