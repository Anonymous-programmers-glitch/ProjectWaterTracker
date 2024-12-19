import dayjs from "dayjs";

function reorderData(dataMonth, currentMonth) {
  const newData = [];
  const countDayofMonth = dayjs(currentMonth).daysInMonth();
  const currentDay = dayjs(currentMonth).format("D-MM-YYYY").split("-");
  for (let i = 1; i <= countDayofMonth; i++) {
    currentDay[0] = i;
    const isDay = dataMonth.find((data) => data.date === currentDay.join("-"));

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
