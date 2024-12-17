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
import Button from "../../components/ui/Button/Button.jsx";
import PlusCircleOutline from "../../components/ui/icons/PlusCircleOutline.jsx";
import { changeMonthSelector } from "../../redux/changeMonth/changeMonth.js";
import { selectWaterToday, addWater } from "../../redux/waterToday/waterTodayslice.js";
import { dataMonth } from "../../tempData/homepagetempdata.js";
import TodayListModal from "../../components/TodayListModal/TodayListModal.jsx";
import css from "./homepage.module.css";

function HomePage() {
  const dispatch = useDispatch();
  const [newData, setNewData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataToday = useSelector(selectWaterToday);
  const monthState = useSelector(changeMonthSelector);

  // Открытие и закрытие модального окна
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Обработчик сохранения данных из модального окна
  const handleSaveWaterData = (data) => {
    // Форматируем дату
    const formattedDate = dayjs(data.date || new Date()).format("YYYY-MM-DD");

    if (!dayjs(formattedDate).isValid()) {
      console.error("Invalid date format:", data.date);
      return;
    }

    // Добавляем данные в Redux
    dispatch(
      addWater({
        id: Math.random().toString(36).substr(2, 9), // Генерация уникального ID
        date: formattedDate,
        amount: data.amount || 0, // Объем воды в миллилитрах
      })
    );

    // Закрываем модалку
    closeModal();
  };

  // Переформирование данных для текущего месяца
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

  // Обновляем данные для месяца при изменении месяца
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
          <Button onClick={openModal}> {/* Кнопка открытия модального окна */}
            <div className={css.btn}>
              <PlusCircleOutline />
              <p>Add Water</p>
            </div>
          </Button>
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

      {/* Модальное окно */}
      <TodayListModal
        isOpen={isModalOpen}
        mode="add"
        onSave={handleSaveWaterData} // Передаем функцию сохранения
        onClose={closeModal} // Передаем функцию закрытия
      />
    </section>
  );
}

export default HomePage;

