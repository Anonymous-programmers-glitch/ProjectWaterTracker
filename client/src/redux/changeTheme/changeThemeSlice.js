import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const changeThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = changeThemeSlice.actions;
export default changeThemeSlice.reducer;
