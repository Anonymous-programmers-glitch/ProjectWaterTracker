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
import changeMonthReducer from "./changeMonth/changeMonth.js";
import userReducer from "./userSlice";
import modalReducer from "./modal/modalSlice.js";
import authReducer from "./auth/authSlice.js";
import themeReducer from "./themeSlice/themeSlice.jsx";
import waterTodayReducer from "./waterToday/slice.js";

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
  authReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedAccessToken,
    changeMonth: changeMonthReducer,
    user: userReducer,
    modal: modalReducer,
    theme: persistedThemeReducer,
    today: waterTodayReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
