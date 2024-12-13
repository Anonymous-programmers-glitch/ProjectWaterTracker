import { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "../../components/homepage/datePicker/DatePicker.jsx";
import WaterListIItemToday from "../../components/homepage/waterListItemToday/WaterListIItemToday.jsx";
import Bottle from "../../components/homepage/bottle.jsx";
import MyDailyCard from "../../components/homepage/mydaylicard/MyDayliCard.jsx";
import WaterListIItemMonth from "../../components/homepage/waterListItemMonth/WaterListIItemMonth.jsx";
import WaterListMonth from "../../components/homepage/waterListMonth/WaterListMonth.jsx";
import WaterListToday from "../../components/homepage/waterListToday/WaterListToday.jsx";
import WaterRange from "../../components/homepage/waterrange/WaterRange.jsx";
import { changeMonthSelector } from "../../redux/changeMonth/changeMonth.js";
import { selectWaterToday } from "../../redux/waterToday/waterTodayslice.js";
import { dataMonth } from "../../tempData/homepagetempdata.js";
import css from "./homepage.module.css";

function HomePage() {
  const [newData, setNewData] = useState([]);
  const dataToday = useSelector(selectWaterToday);
  const monthState = useSelector(changeMonthSelector);
  function reorderData(dataMonth, currentMonth) {
    let prevDay = 0;
    const newData = [];
    let arrayDate;
    let day;
    let month;

    const crMount = Number(currentMonth.split("-")[1]);
    console.log(crMount);
    dataMonth.map((item) => {
      arrayDate = item.date.split("-");
      day = Number(arrayDate[0]);
      month = Number(arrayDate[1]);
      if (month === crMount) {
        if (day === prevDay + 1) {
          newData.push(item);
          prevDay = day;
        } else {
          while (day !== prevDay + 1) {
            const defaultData = { id: "", date: "", percent: "0" };
            defaultData.id = Math.random().toString(36);
            arrayDate[0] = `${prevDay + 1}`;
            defaultData.date = arrayDate.join("-");
            newData.push(defaultData);
            prevDay++;
          }
          newData.push(item);
          prevDay = day;
        }
      }
    });
    return newData;
  }
  useEffect(() => {
    setNewData(reorderData(dataMonth, monthState));
  }, [monthState]);

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
        <div className={css.month}>
          <h2 className={css.titlemonth}>Month</h2>
          <DatePicker />
        </div>
        <WaterListMonth>
          {newData.map((item) => (
            <WaterListIItemMonth key={item.id} item={item} />
          ))}
        </WaterListMonth>
      </div>
    </section>
  );
}

export default HomePage;
