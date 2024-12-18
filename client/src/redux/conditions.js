export function condition(_, thunkAPI) {
  const state = thunkAPI.getState();

  return state.auth.accessToken !== null;
}
