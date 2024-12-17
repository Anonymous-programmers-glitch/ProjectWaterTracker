import { createSlice } from "@reduxjs/toolkit";
import { dataToday } from "../../tempData/homepagetempdata.js";

// Селектор для получения данных о воде
export const selectWaterToday = (state) => state.waterToday.items;

const slice = createSlice({
  name: "waterToday",
  initialState: {
    items: dataToday,
    totalAmount: 0,  // Добавим поле для хранения общего количества воды
  },
  reducers: {
    addWater: (state, action) => {
      // Добавление новой записи о воде
      state.items.push(action.payload);
      // Обновление общего количества воды
      state.totalAmount += action.payload.amount;  // Суммируем количество воды
    },
    deleteWater: (state, action) => {
      const removedItem = state.items.find(item => item.id === action.payload);
      if (removedItem) {
        // Убираем удаленный элемент из списка
        state.items = state.items.filter(item => item.id !== action.payload);
        // Уменьшаем общее количество воды
        state.totalAmount -= removedItem.amount;
      }
    },
  },
});

export const { addWater, deleteWater } = slice.actions;

export default slice.reducer;


