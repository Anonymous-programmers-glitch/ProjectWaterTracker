import { createSlice } from "@reduxjs/toolkit";
import { dataMonth } from "../../tempData/homepagetempdata.js";

export const selectWaterMonth = (state) => state.waterToday.items;

const slice = createSlice({
  name: "waterToday",
  initialState: {
    items: dataMonth,
  },
  reducers: {},
});

export const {} = slice.actions;

export default slice.reducer;
