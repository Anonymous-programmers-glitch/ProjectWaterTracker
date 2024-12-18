import css from "./waterrange.module.css";

function WaterRange() {
  const value = 50;

  return (
    <div className={css.slidercontainer}>
      <p className={css.slidertitle}>Today</p>
      <div className={css.divslider}>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={() => {}}
          className={css.slider}
        />
        <ul className={css.sliderlabels}>
          <li className={css.sliderlabelleft}>
            <span className={css.trot}></span>
            <span className={css.span}>0%</span>
          </li>
          <li className={css.sliderlabelcenter}>
            <span className={css.trot}></span>
            <span className={css.spancentr}>50%</span>
          </li>
          <li className={css.sliderlabelright}>
            <span className={css.trot}></span>
            <span className={css.span}>100%</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default WaterRange;
