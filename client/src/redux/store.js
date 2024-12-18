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
import waterTodayReducer from "./waterToday/waterTodayslice.js";
import modalReducer from "./modal/slice.js";
import userReducer from "./user/slice.js";
import themeReducer from "./themeSlice/themeSlice.jsx";

const persistedWaterTodayReducer = persistReducer(
  {
    key: "water-today",
    storage,
  },
  waterTodayReducer
);

const persistedThemeReducer = persistReducer(
  {
    key: "theme",
    storage,
  },
  themeReducer
);
const persistedAccessToken = persistReducer(
  {
    key: "accessToken",
    storage,
    whitelist: ["accessToken"],
  },
  userReducer
);

export const store = configureStore({
  reducer: {
    user: persistedAccessToken,
    waterToday: persistedWaterTodayReducer,
    changeMonth: changeMonthReducer,
    modal: modalReducer,
    theme: persistedThemeReducer,
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
