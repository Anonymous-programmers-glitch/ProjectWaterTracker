import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "../../components/ComponentsForHomePage/datePicker/DatePicker.jsx";
import WaterListIItemToday from "../../components/ComponentsForHomePage/waterListItemToday/WaterListIItemToday.jsx";
import Bottle from "../../components/ComponentsForHomePage/bottle.jsx";
import MyDailyCard from "../../components/ComponentsForHomePage/myDayliCard/MyDayliCard.jsx";
import WaterListIItemMonth from "../../components/ComponentsForHomePage/waterListItemMonth/WaterListIItemMonth.jsx";
import WaterListMonth from "../../components/ComponentsForHomePage/waterListMonth/WaterListMonth.jsx";
import WaterListToday from "../../components/ComponentsForHomePage/waterListToday/WaterListToday.jsx";
import WaterRange from "../../components/ComponentsForHomePage/waterRange/WaterRange.jsx";
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal.jsx';
import MyDailyNorma from "../../components/MyDailyForma/MyDailyForma.jsx";
import AddWaterModal from "../../components/TodayListModal/AddWaterModal.jsx";
import TodayListModal from "../../components/TodayListModal/EditListModal.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import PlusCircleOutline from "../../components/ui/icons/PlusCircleOutline.jsx";
import TextButton from "../../components/ui/TextButton/TextButton.jsx";
import { changeMonthSelector } from "../../redux/changeMonth/changeMonthSlice.js";
import { openAddModal } from "../../redux/modalToggle/slice.js";
import { selectEditUser } from '../../redux/user/selectors.js';
import { fetchWaterMonth } from "../../redux/waterMonth/operations.js";
import { getIsWaterMonth } from "../../redux/waterMonth/selectors.js";
import { fetchWaterToday } from "../../redux/waterToday/operations.js";
import {
  getEdit,
  getError,
  getIsLoading,
  getIsWaterToday,
} from '../../redux/waterToday/selectors.js';

import css from "./homepage.module.css";

function HomePage() {
  const dispatch = useDispatch();
  const dateNow = dayjs().format("YYYY-MM-DD");
  const { waterRecords } = useSelector(getIsWaterToday);
  const { percentage } = useSelector(getIsWaterToday);
  const IsLoading = useSelector(getIsLoading);
  const isEdit=useSelector(getEdit);
  const isError = useSelector(getError);
  const monthState = useSelector(changeMonthSelector);
  const dataMonth = useSelector(getIsWaterMonth);
  const userEdit=useSelector(selectEditUser)

  useEffect(() => {
    dispatch(fetchWaterToday(dateNow));
  }, [dispatch, waterRecords.length,isEdit,userEdit]);

  useEffect(() => {
    const date = {
      month: dayjs(monthState).format("MM"),
      year: dayjs(monthState).format("YYYY"),
    };
    dispatch(fetchWaterMonth(date));
  }, [dispatch, monthState, waterRecords.length,isEdit,userEdit]);

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
          <Button onClick={handleAdd} cssstyle="addwater" >
            <div className={css.btn}>
              <PlusCircleOutline/>
              <p>Add Water</p>
            </div>
          </Button>
        </div>
      </div>
      <div className={css.today}>
        <h2 className={css.title}>Today</h2>

        {!isError ? (
          <WaterListToday>
            {waterRecords.map((item,index) => (
              <WaterListIItemToday  key={index} item={item} />
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
          {dataMonth.map((item) => (
            <WaterListIItemMonth key={item.date} item={item} />
          ))}
        </WaterListMonth>
      </div>
      <AddWaterModal />
      <TodayListModal />
      <MyDailyNorma />
      <DeleteWaterModal/>
    </section>
  );
}

export default HomePage;
