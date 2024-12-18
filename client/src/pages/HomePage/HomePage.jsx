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
import AddWaterModal from "../../components/TodayListModal/AddWaterModal.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import PlusCircleOutline from "../../components/ui/icons/PlusCircleOutline.jsx";
import { changeMonthSelector } from "../../redux/changeMonth/changeMonth.js";
import { openAddModal } from "../../redux/modal/slice.js";
import { selectAddModal } from "../../redux/modal/selectors.js";
import { fetchWaterToday } from "../../redux/waterToday/operations.js";
import {
  getError,
  getIsLoading,
  getIsWaterToday,
} from "../../redux/waterToday/selectors.js";

import TodayListModal from "../../components/TodayListModal/TodayListModal.jsx";
import { dataMonth } from "../../tempData/homepagetempdata.js";
import css from "./homepage.module.css";

function HomePage() {
  const dispatch = useDispatch();
  const [newData, setNewData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchWaterToday("2024-12-17"));
  }, [dispatch]);

  const isOpenAdd = useSelector(selectAddModal);

  const { waterRecords } = useSelector(getIsWaterToday);

  // const isLoad = useSelector(getIsLoading);
  // const isError = useSelector(getError);
  const monthState = useSelector(changeMonthSelector);

  // Обработчик сохранения данных из модального окна
  // const handleSaveWaterData = (data) => {
  //   const formattedDate = dayjs().format("YYYY-MM-DD"); // Текущая дата
  //   const formattedTime = dayjs(data.manualTime, "HH:mm").isValid()
  //     ? dayjs(data.manualTime, "HH:mm").format("HH:mm")
  //     : dayjs().format("HH:mm"); // Формат времени
  //
  //   if (!data.amount || isNaN(data.amount)) {
  //     console.error("Invalid water amount:", data.amount);
  //     return;
  //   }
  //
  //   Добавляем данные в Redux
  //   dispatch(
  //     addWater({
  //       id: Math.random().toString(36).substr(2, 9), // Уникальный ID
  //       date: formattedDate, // Дата
  //       time: formattedTime, // Время
  //       amount: data.amount, // Объем воды
  //     }),
  //   );
  //
  //   closeModal(); // Закрываем модальное окно
  // };

  // Переформирование данных для текущего месяца
  function reorderData(dataMonth, currentMonth) {
    const newData = [];
    const countDayofMonth = dayjs(currentMonth).daysInMonth();
    const currentDay = dayjs(currentMonth).format("D-MM-YYYY").split("-");
    for (let i = 1; i <= countDayofMonth; i++) {
      currentDay[0] = i;
      const isDay = dataMonth.find(
        (data) => data.date === currentDay.join("-"),
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

  useEffect(() => {
    setNewData(reorderData(dataMonth, monthState));
  }, [monthState]);

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
          <WaterRange />

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

        {waterRecords.length > 0 ? (
          <WaterListToday>
            {waterRecords.map((item) => (
              <WaterListIItemToday key={item._id} item={item} />
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
      <AddWaterModal />
    </section>
  );
}

export default HomePage;
