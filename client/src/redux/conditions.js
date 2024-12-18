export function condition(_, thunkAPI) {
  const state = thunkAPI.getState();

  return state.user.accessToken !== null;
}
