import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMothData = createAsyncThunk(
  "month/fetchAll",

  async (date, thunkAPI) => {
    try {
      const { data } = await axios.get("/month");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  },
);
