import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser, signup, verifyUser } from "./operations";
import { clearAuthHeader, setAuthHeader } from "../../api/operationsAPI";

const initialState = {
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      setAuthHeader(action.payload);
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoggedIn = false;
      clearAuthHeader();
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        setAuthHeader(action.payload.accessToken);
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, () => {
        clearAuthHeader();
        localStorage.removeItem("accessToken");
        return initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
        setAuthHeader(action.payload.accessToken);
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      });
  },
});
//   .addMatcher(
//     isAnyOf(register.fulfilled, logIn.fulfilled),
//     handleFulfilled
//   );
// },
// });
export const { setAccessToken, clearAuth } = slice.actions;

export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectAccessToken = (state) => state.auth.accessToken;

export default slice.reducer;
