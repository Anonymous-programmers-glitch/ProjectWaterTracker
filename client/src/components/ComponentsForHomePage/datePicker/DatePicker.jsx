import dayjs from "dayjs";

import { useDispatch, useSelector } from "react-redux";
import {
  changeMonthSelector,
  nextMonth,
  prevMonth,
} from "../../../redux/changeMonth/changeMonthSlice.js";
import TextButton from '../../ui/TextButton/TextButton.jsx';
import css from "./datePicker.module.css";

function DatePicker() {
  const month = useSelector(changeMonthSelector);
  const dispatch = useDispatch();
  const currentMonth = dayjs(new Date().toISOString()).format("MM");
  const isNextMonth = dayjs(new Date(month ).toISOString()).format("MM") === currentMonth ? false : true;


  const handlePrevMonth = () => {
    dispatch(prevMonth());
  };

  const handleNextMonth = () => {
    dispatch(nextMonth());
  };

  const getMonthYear = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();
    return `${month}, ${year}`;
  };

  return (
    <div className={css.datepicker}>
      <TextButton clas={css.but} onClick={handlePrevMonth}>
        &lt;
      </TextButton>
      <span className={css.monthyear}>{getMonthYear(month)}</span>
      {isNextMonth && <TextButton clas={css.but} onClick={handleNextMonth}>
        &gt;
      </TextButton>}
    </div>
  );
}

export default DatePicker;
