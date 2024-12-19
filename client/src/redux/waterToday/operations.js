import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../../api/operationsAPI.js";
import { condition } from "../conditions.js";

export const fetchWaterToday = createAsyncThunk(
  "today/fetchAllWaterToday",
  async (date, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.user.accessToken);
      const { data } = await axios.get(`/water/day/${date}`);
      return data.data; // Возвращаем данные, чтобы они могли быть использованы в reducer
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
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.user.accessToken);
      await axios.delete(`/water/${id}`);
      return id; // Возвращаем id, так как он нужен для обновления состояния
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
      return data;  // Возвращаем обновленные данные, чтобы они могли быть использованы в reducer
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
  async ({ date, amount }, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.user.accessToken);
      const { data } = await axios.post("/water/", { date, amount });
      return data; // Возвращаем данные, чтобы они могли быть использованы в reducer
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  },
);
