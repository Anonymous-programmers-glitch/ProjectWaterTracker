import { useSelector } from "react-redux";
import WaterListIItemToday from "../../components/homepage/waterListItemToday/WaterListIItemToday.jsx";
import Bottle from "../../components/homepage/bottle.jsx";
import MyDailyCard from "../../components/homepage/mydaylicard/MyDayliCard.jsx";
import WaterListIItemMonth from "../../components/homepage/waterListItemMonth/WaterListIItemMonth.jsx";
import WaterListMonth from "../../components/homepage/waterListMonth/WaterListMonth.jsx";
import WaterListToday from "../../components/homepage/waterListToday/WaterListToday.jsx";
import WaterRange from "../../components/homepage/waterrange/WaterRange.jsx";
import { selectWaterToday } from "../../redux/waterToday/waterTodayslice.js";
import { dataMonth } from "../../tempData/homepagetempdata.js";
import css from "./homepage.module.css";

function HomePage() {
  const dataToday = useSelector(selectWaterToday);
  return (
    <section className={css.homepage}>
      <div className={css.topcontent}>
        <div className={css.bottle}>
          <div className={css.dayli}>
            <MyDailyCard />
          </div>
          <Bottle />
        </div>
        <div className={css.rangeblok}>
          <WaterRange />
          <button>Add Water</button>
        </div>
      </div>
      <div className={css.today}>
        <h2 className={css.title}>Today</h2>

        {dataToday.length > 0 ? (
          <WaterListToday>
            {dataToday.map((item) => (
              <WaterListIItemToday key={item.id} item={item} />
            ))}
          </WaterListToday>
        ) : (
          <h2 className={css.list}>No notes yet</h2>
        )}
        <h3>Add water</h3>
        <h2 className={css.title}>Month</h2>
        <WaterListMonth>
          {dataMonth.map((item) => (
            <WaterListIItemMonth key={item.id} item={item} />
          ))}
        </WaterListMonth>
      </div>
    </section>
  );
}

export default HomePage;
