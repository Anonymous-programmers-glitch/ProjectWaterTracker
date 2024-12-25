import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  login,
  logout,
  refresh,
  requestResetToken,
  resetPassword,
  signup,
  update,
  updateAvatar,
} from "./operations";

const initialState = {
  user: null,
  avatarUrl: null,
  status: null,
  message: null,
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
  isEdit: false,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.isEdit = false;
  state.error = null;
  state.status = null;
  state.message = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.status = action.payload.status;
  state.message = action.payload.data?.message || action.payload.error;
  state.error = action.payload.message ?? "Unknown error";
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data.user;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.error = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data.user;
      state.avatarUrl = action.payload.data.user.avatarUrl;
      state.accessToken = action.payload.data.accessToken;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.isLoggedIn = true;
      state.error = null;
    });

    builder.addCase(logout.fulfilled, () => {
      return initialState;
    });

    builder
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
        state.status = null;
        state.message = null;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        console.log("action.payload :>> ", action.payload);
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
        state.status = null;
        state.message = null;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      });

    builder
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isEdit = true;
        state.user = {
          ...state.user,
          ...action.payload.data.user,
        };
      })

      //додав свій кейс з реджектід для нотіфікашок
      .addCase(update.rejected, (state, action) => {
        state.error = action.payload.message;
      });

    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user.avatarUrl = action.payload;
    });

    // builder
    //   .addCase(refreshToken.pending, (state) => {
    //     state.isRefreshing = true;
    //     state.error = null;
    //   })
    //   .addCase(refreshToken.fulfilled, (state, action) => {
    //     state.isRefreshing = false;
    //     state.isLoggedIn = true;
    //     state.accessToken = action.payload;
    //   })
    //   .addCase(refreshToken.rejected, (state, action) => {
    //     state.isRefreshing = false;
    //     state.error = action.payload;
    //   });

    builder
      .addCase(requestResetToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestResetToken.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(requestResetToken.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      });

    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })

      .addMatcher(
        isAnyOf(
          signup.pending,
          login.pending,
          logout.pending,
          update.pending,
          updateAvatar.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          signup.rejected,
          login.rejected,
          logout.rejected,
          update.rejected,
          updateAvatar.rejected
        ),
        handleRejected
      );
  },
});

export default slice.reducer;
