import { createSlice } from "@reduxjs/toolkit";
import { putHistory } from "./operations.js";

function handlePending(state) {
  state.isLoading = true;
}

function handleRejected(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

const slice = createSlice({
  name: "history",
  initialState: {
    items:{
      date:"",
      norma:""
    },
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(putHistory.pending, handlePending)
      .addCase(putHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(putHistory.rejected, handleRejected);
  },
});
export default slice.reducer;
