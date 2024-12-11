import WaterListIItemToday from "../../components/homepage/waterListItem/WaterListIItemToday.jsx";
import Butt from "../../components/homepage/butt.jsx";
import MyDailyCard from "../../components/homepage/mydaylicard/MyDayliCard.jsx";
import WaterListIItemMonth from "../../components/homepage/waterListItemMonth/WaterListIItemMonth.jsx";
import WaterListMonth from "../../components/homepage/waterListMonth/WaterListMonth.jsx";
import WaterListToday from "../../components/homepage/waterlisttoday/WaterListToday.jsx";
import WaterRange from "../../components/homepage/waterrange/WaterRange.jsx";
import { resizeWindow } from "../../utils/resizeWindow.js";
import css from "./homepage.module.css";

const dataToday = [
  { id: "1", volumeOfWater: "200", time: "9:00" },
  { id: "2", volumeOfWater: "200", time: "10:00" },
  { id: "3", volumeOfWater: "200", time: "11:00" },
  { id: "4", volumeOfWater: "200", time: "12:00" },
  { id: "5", volumeOfWater: "200", time: "13:00" },
  { id: "6", volumeOfWater: "200", time: "14:00" },
  { id: "7", volumeOfWater: "200", time: "15:00" },
  { id: "8", volumeOfWater: "200", time: "16:00" },
  { id: "9", volumeOfWater: "200", time: "17:00" },
  { id: "10", volumeOfWater: "200", time: "18:00" },
];

const dataMonth = [
  { id: "1", day: "1", percent: "50" },
  { id: "2", day: "2", percent: "100" },
  { id: "3", day: "3", percent: "100" },
  { id: "4", day: "4", percent: "100" },
  { id: "5", day: "5", percent: "100" },
  { id: "6", day: "6", percent: "100" },
  { id: "7", day: "7", percent: "100" },
  { id: "8", day: "8", percent: "100" },
  { id: "9", day: "9", percent: "100" },
  { id: "10", day: "10", percent: "100" },
  { id: "11", day: "11", percent: "100" },
  { id: "12", day: "12", percent: "100" },
  { id: "13", day: "13", percent: "100" },
  { id: "14", day: "14", percent: "100" },
  { id: "15", day: "15", percent: "100" },
  { id: "16", day: "16", percent: "100" },
  { id: "17", day: "17", percent: "100" },
  { id: "18", day: "18", percent: "100" },
  { id: "19", day: "19", percent: "100" },
  { id: "20", day: "20", percent: "100" },
  { id: "21", day: "21", percent: "80" },
  { id: "22", day: "22", percent: "70" },
  { id: "23", day: "23", percent: "100" },
  { id: "24", day: "24", percent: "100" },
  { id: "25", day: "25", percent: "100" },
  { id: "26", day: "26", percent: "100" },
  { id: "27", day: "27", percent: "50" },
  { id: "28", day: "28", percent: "10" },
  { id: "29", day: "29", percent: "100" },
  { id: "30", day: "30", percent: "70" },
];

function HomePage() {
  const sizeWindow = resizeWindow();
  const isMobile = sizeWindow <= 767;
  const isTablet = sizeWindow > 767 || sizeWindow < 1439;
  const isDesktop = sizeWindow >= 1440;

  console.log(isMobile, isTablet, isDesktop);
  return (
    <main className={css.homepage}>
      <MyDailyCard />
      <div className={css.butl}>
        <Butt />
      </div>

      <div className={css.rangeblok}>
        <WaterRange />
        <button>Add Water</button>
      </div>

      <div className={css.today}>
        <h2 className={css.title}>Today</h2>
        <WaterListToday>
          {dataToday.map((item) => (
            <WaterListIItemToday key={item.id} item={item} />
          ))}
        </WaterListToday>
        <h3>Add water</h3>
        <h2 className={css.title}>Month</h2>
        <WaterListMonth>
          {dataMonth.map((item) => (
            <WaterListIItemMonth key={item.id} item={item} />
          ))}
        </WaterListMonth>
      </div>
    </main>
  );
}

export default HomePage;
4;
