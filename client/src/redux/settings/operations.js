import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUser = createAsyncThunk(
  "users/updateContact",
  async (idUser, thunkAPI) => {
    try {
      await axios.patch(`/users/${idUser}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  },
  {
    condition: (_, thunkApi) => {
      const reduxState = thunkApi.getState();
      return reduxState.auth.token !== null;
    },
  }
);
