import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: true,
    userData: {}, // Дані користувача
  },
  reducers: {
    clearUserData: (state) => {
      state.isAuthenticated = false;
      state.userData = {};
    },
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;