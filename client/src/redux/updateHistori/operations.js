import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../../api/operationsAPI.js";
import { condition } from "../conditions.js";

export const putHistory = createAsyncThunk(
  "history/userNormaHistory",
  async (data, thunkAPI) => {
    const {  date,
      norma } = data;
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.user.accessToken);
      const { data } = await axios.put(`/`, { date, norma });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  },
);