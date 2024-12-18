import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const updateUser = createAsyncThunk(
//   "users/updateContact",
//   async (idUser, thunkAPI) => {
//     try {
//       await axios.patch(`/users/${idUser}`);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.massage);
//     }
//   },
//   {
//     condition: (_, thunkApi) => {
//       const reduxState = thunkApi.getState();
//       return reduxState.auth.token !== null;
//     },
//   }
// );

export const updateUserPhoto = createAsyncThunk(
  "user/updatePhoto",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.patch("/users/uploadPhoto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
