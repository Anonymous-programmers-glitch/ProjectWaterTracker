import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import changeMonthReducer from "./changeMonth/changeMonthSlice.js";
import modalReducer from "./modalToggle/slice.js";
import userReducer from "./user/slice.js";
import themeReducer from "./changeTheme/changeThemeSlice.js";
import waterTodayReducer from "./waterToday/slice.js";
import waterMonthReducer from "./waterMonth/slice.js";

const persistedThemeReducer = persistReducer(
  {
    key: "theme",
    storage,
  },
  themeReducer,
);
const persistedAccessToken = persistReducer(
  {
    key: "accessToken",
    storage,
    whitelist: ["accessToken"],
  },
  userReducer,
);

export const store = configureStore({
  reducer: {
    user: persistedAccessToken,
    changeMonth: changeMonthReducer,
    modal: modalReducer,
    theme: persistedThemeReducer,
    today: waterTodayReducer,
    month: waterMonthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

});

export const persistor = persistStore(store);
