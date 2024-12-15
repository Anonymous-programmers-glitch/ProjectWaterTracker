import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logoutUser = createAsyncThunk('user/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await axios.post('/api/logout');
    return true; 
  } catch (error) {
    console.error('Error while exiting:', error);
    return rejectWithValue(error.response?.data || 'Logout failed');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: true, 
    userData: null,
    error: null,
  },
  reducers: {
    clearUserData(state) {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userData = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload || 'Unknown error occurred';
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;