import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  login,
  logout,
  refresh,
  // requestResetToken,
  // resetPassword,
  signup,
  update,
  updateAvatar,
} from "./operations";

const initialState = {
  user: null,
  avatarUrl: null,
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload ?? "Unknown error";
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
    });

    builder.addCase(logout.fulfilled, () => {
      return initialState;
    });

    builder
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      });

    builder.addCase(update.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = {
        ...state.user,
        ...action.payload.user,
      };
    });

    builder
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatarUrl = action.payload.avatarUrl;
      })

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

      // builder
      //   .addCase(requestResetToken.pending, (state) => {
      //     state.isLoading = true;
      //     state.error = null;
      //   })
      //   .addCase(requestResetToken.fulfilled, (state) => {
      //     state.isLoading = false;
      //     // state.accessToken = action.payload;
      //   })
      //   .addCase(requestResetToken.rejected, (state, action) => {
      //     state.isRefreshing = false;
      //     state.error = action.payload;
      //   });

      // builder
      //   .addCase(resetPassword.pending, (state) => {
      //     state.isLoading = true;
      //     state.error = null;
      //   })
      //   .addCase(resetPassword.fulfilled, (state) => {
      //     state.isLoading = false;
      //     // state.accessToken = action.payload;
      //   })
      //   .addCase(resetPassword.rejected, (state, action) => {
      //     state.isRefreshing = false;
      //     state.error = action.payload;
      //   })

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
