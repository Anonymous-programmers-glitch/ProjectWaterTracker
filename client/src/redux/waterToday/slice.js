import { createSlice } from "@reduxjs/toolkit";

import {
  addWaterToday,
  deleteWaterToday,
  editWaterToday,
  fetchWaterToday,
} from "./operations.js";

function handlePending(state) {
  state.isLoading = true;
}

function handleRejected(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

const slice = createSlice({
  name: "today",
  initialState: {
    items: {
      percentage: 0,
      recordsCount: 0,
      totalDayWater: 0,
      waterRecords: [],
    },
    isLoading: false,
    error: null,
    edit: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterToday.pending, handlePending)
      .addCase(fetchWaterToday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.edit = false;
        state.error = null;
        state.items = action.payload.data;
      })
      .addCase(fetchWaterToday.rejected, handleRejected);
    builder
      .addCase(addWaterToday.pending, handlePending)
      .addCase(addWaterToday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.waterRecords.push(action.payload.waterRecord);
      })
      .addCase(addWaterToday.rejected, handleRejected);
    builder
      .addCase(deleteWaterToday.pending, handlePending)
      .addCase(deleteWaterToday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const index = state.items.waterRecords.findIndex(
          (water) => water._id === action.payload._id
        );

        state.items.waterRecords.splice(index, 1);
      })
      .addCase(deleteWaterToday.rejected, handleRejected);
    builder
      .addCase(editWaterToday.pending, handlePending)
      .addCase(editWaterToday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.waterRecords.findIndex(
          (waterId) => waterId.id === action.payload._id
        );

        state.items.waterRecords.splice(index, 1, action.payload.data);
        state.edit = true;
      })
      .addCase(editWaterToday.rejected, handleRejected);
  },
});
export default slice.reducer;
