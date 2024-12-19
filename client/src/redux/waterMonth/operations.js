import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../../api/operationsAPI.js";
import { condition } from "../conditions.js";

export const fetchWaterMonth = createAsyncThunk(
  "monTh/fetchAllWaterMonth",
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
  },
);
