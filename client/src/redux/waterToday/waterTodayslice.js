import { createSlice } from "@reduxjs/toolkit";
import { dataToday } from "../../tempData/homepagetempdata.js";

export const selectWaterToday = (state) => state.waterToday.items;

const slice = createSlice({
  name: "waterToday",
  initialState: {
    items: dataToday,
  },
  reducers: {
    addWater: (state, action) => {
      state.items.push(action.payload);
    },
    deleteWater: (state, action) => {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload,
      );
    },
  },
});

export const { addWater, deleteWater } = slice.actions;

export default slice.reducer;
