import { createSlice } from "@reduxjs/toolkit";
import { fetchMothData } from "./operations.js";

function handlePending(state) {
  state.isLoading = true;
}

function handleRejected(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

const slice = createSlice({
  name: "monthData",
  initialState: {
    items: [
      {
        id: "",
        date: "",
        percent: "",
        countOfDay: 0,
        percentOfDay: 0,
        waterNorma: 1.5,
      },
    ],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMothData.pending, handlePending)
      .addCase(fetchMothData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchMothData.rejected, handleRejected);
  },
});
export const monthDataReducer = slice.reducer;
