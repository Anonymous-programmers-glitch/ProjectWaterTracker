import axios, { setAuthHeader } from "../../api/operationsAPI.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { condition } from "../conditions.js";

export const putHistory = createAsyncThunk(
  "history/userNormaHistory",
  async (data, thunkAPI) => {
    const { date, dailyNorma } = data;
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.user.accessToken);
      const { data } = await axios.put(`/userNormaHistory`, {
        date,
        dailyNorma,
      });

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  }
);
