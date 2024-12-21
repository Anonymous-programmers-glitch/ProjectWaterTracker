export const selectUser = (state) => state.user.user;
export const selectAvatarUrl = (state) => state.user.avatarUrl;
export const selectLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsRefreshing = (state) => state.user.isRefreshing;
export const selectAccessToken = (state) => state.user.accessToken;
export const selectEditUser = (state) => state.user.isEdit;
