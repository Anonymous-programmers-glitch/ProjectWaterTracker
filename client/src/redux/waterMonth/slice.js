import { createSlice } from "@reduxjs/toolkit";
import { fetchWaterMonth } from "./operations.js";

function handlePending(state) {
  state.isLoading = true;
}

function handleRejected(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

const slice = createSlice({
  name: "month",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterMonth.pending, handlePending)
      .addCase(fetchWaterMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchWaterMonth.rejected, handleRejected);
  },
});
export default slice.reducer;
