import { createSlice } from "@reduxjs/toolkit";

export const changeMonthSelector = (state) => state.changeMonth.month;

const slice = createSlice({
  name: "changeMonth",
  initialState: {
    month: new Date().toISOString(),
  },
  reducers: {
    prevMonth: (state) => {
      const newDate = new Date(
        new Date(state.month).setMonth(new Date(state.month).getMonth() - 1),
      ).toISOString();
      state.month = newDate;
    },

    nextMonth: (state) => {
      const newDate = new Date(
        new Date(state.month).setMonth(new Date(state.month).getMonth() + 1),
      ).toISOString();
      state.month = newDate;
    },
  },
});

export const { prevMonth, nextMonth } = slice.actions;

export default slice.reducer;
