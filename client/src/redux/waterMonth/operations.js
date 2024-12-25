import axios, { setAuthHeader } from "../../api/operationsAPI.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { condition } from "../conditions.js";

export const fetchWaterMonth = createAsyncThunk(
  "month/fetchAllWaterMonth",
  async (date, thunkAPI) => {
    const { month, year } = date;
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.user.accessToken);
      const { data } = await axios.get(`/water/${month}/${year}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  }
);
