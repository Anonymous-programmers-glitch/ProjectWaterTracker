import axios, { setAuthHeader } from "../../api/operationsAPI.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { condition } from "../conditions.js";

export const fetchWaterToday = createAsyncThunk(
  "today/fetchAllWaterToday",
  async (date, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.user.accessToken);
      const { data } = await axios.get(`/water/day/${date}`);
      return data;
    } catch (error) {
      if (error.response?.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  }
);

export const deleteWaterToday = createAsyncThunk(
  "today/deleteWaterToday",
  async (id, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.user.accessToken);
      const { data } = await axios.delete(`/water/${id}`);
      return data;
    } catch (error) {
      if (error.response?.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  }
);

export const editWaterToday = createAsyncThunk(
  "today/editWaterToday",
  async (water, thunkAPI) => {
    const reduxState = thunkAPI.getState();

    setAuthHeader(reduxState.user.accessToken);
    try {
      const { _id, ...updatedFields } = water;
      const { data } = await axios.patch(`/water/${_id}`, updatedFields);
      return data;
    } catch (error) {
      if (error.response?.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  }
);

export const addWaterToday = createAsyncThunk(
  "today/addWaterToday",
  async ({ date, amount }, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.user.accessToken);
      const { data } = await axios.post("/water", { date, amount });
      return data;
    } catch (error) {
      if (error.response?.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: condition,
  }
);
