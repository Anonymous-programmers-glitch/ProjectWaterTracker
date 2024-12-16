import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { condition } from "../conditions.js";

export const fetchWaterToday = createAsyncThunk(
  "today/fetchAllWaterToday",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/water/day");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  },
);

export const deleteWaterToday = createAsyncThunk(
  "today/deleteWaterToday",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/water/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  },
);

export const editWaterToday = createAsyncThunk(
  "today/editWaterToday",
  async (water, thunkAPI) => {
    try {
      const { id, ...updatedFields } = water;
      const { data } = await axios.patch(`/water/${id}`, updatedFields);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  },
);

export const addWaterToday = createAsyncThunk(
  "today/addWaterToday",
  async ({ date, time, amount }, thunkAPI) => {
    try {
      const { data } = await axios.post("/water/", { date, time, amount });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  },
);