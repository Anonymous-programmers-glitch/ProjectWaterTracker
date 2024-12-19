import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "../../components/HomePage/datePicker/DatePicker.jsx";
import WaterListIItemToday from "../../components/HomePage/waterListItemToday/WaterListIItemToday.jsx";
import Bottle from "../../components/HomePage/bottle.jsx";
import MyDailyCard from "../../components/HomePage/myDayliCard/MyDayliCard.jsx";
import WaterListIItemMonth from "../../components/HomePage/waterListItemMonth/WaterListIItemMonth.jsx";
import WaterListMonth from "../../components/HomePage/waterListMonth/WaterListMonth.jsx";
import WaterListToday from "../../components/HomePage/waterListToday/WaterListToday.jsx";
import WaterRange from "../../components/HomePage/waterRange/WaterRange.jsx";
import MyDailyNorma from "../../components/MyDailyForma/MyDailyForma.jsx";
import AddWaterModal from "../../components/TodayListModal/AddWaterModal.jsx";
import TodayListModal from "../../components/TodayListModal/TodayListModal.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import PlusCircleOutline from "../../components/ui/icons/PlusCircleOutline.jsx";
import TextButton from "../../components/ui/TextButton/TextButton.jsx";
import { changeMonthSelector } from "../../redux/changeMonth/changeMonth.js";
import { openAddModal } from "../../redux/modal/slice.js";
import { fetchWaterToday } from "../../redux/waterToday/operations.js";
import {
  getError,
  getIsLoading,
  getIsWaterToday,
} from "../../redux/waterToday/selectors.js";

import { dataMonth } from "../../tempData/homepagetempdata.js";
import css from "./homepage.module.css";

function HomePage() {
  const dispatch = useDispatch();
  const [newData, setNewData] = useState([]);
  const dateNow = dayjs().format("YYYY-MM-DD");
  const { waterRecords } = useSelector(getIsWaterToday);
  const { percentage } = useSelector(getIsWaterToday);
  const IsLoading = useSelector(getIsLoading);
  const isError = useSelector(getError);
  const monthState = useSelector(changeMonthSelector);

  useEffect(() => {
    dispatch(fetchWaterToday(dateNow));
  }, [dispatch, waterRecords.length]);

  useEffect(() => {
    setNewData(reorderData(dataMonth, monthState));
  }, [monthState]);

  function reorderData(dataMonth, currentMonth) {
    const newData = [];
    const countDayofMonth = dayjs(currentMonth).daysInMonth();
    const currentDay = dayjs(currentMonth).format("D-MM-YYYY").split("-");
    for (let i = 1; i <= countDayofMonth; i++) {
      currentDay[0] = i;
      const isDay = dataMonth.find(
        (data) => data.date === currentDay.join("-")
      );

      if (isDay) {
        newData.push(isDay);
      } else {
        const defaultData = { id: "", date: "", percent: "0" };
        defaultData.id = Math.random().toString(36);
        defaultData.date = currentDay.join("-");
        newData.push(defaultData);
      }
    }

    return newData;
  }

  function handleAdd() {
    dispatch(openAddModal());
  }

  return (
    <section className={css.homepage}>
      <div className={css.background}></div>
      <div className={css.topcontent}>
        <div className={css.bottle}>
          <div className={css.dayli}>
            <MyDailyCard />
          </div>
          <Bottle />
        </div>
        <div className={css.rangeblok}>
          <WaterRange percentage={percentage} />
          <Button onClick={handleAdd}>
            <div className={css.btn}>
              <PlusCircleOutline />
              <p>Add Water</p>
            </div>
          </Button>
        </div>
      </div>
      <div className={css.today}>
        <h2 className={css.title}>Today</h2>

        {!isError ? (
          <WaterListToday>
            {waterRecords.map((item) => (
              <WaterListIItemToday key={item._id} item={item} />
            ))}
          </WaterListToday>
        ) : (
          <h2 className={css.list}>No notes yet</h2>
        )}
        <TextButton onClick={handleAdd}>Add water</TextButton>
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
      <AddWaterModal />
      <TodayListModal />
      <MyDailyNorma />
    </section>
  );
}

export default HomePage;
