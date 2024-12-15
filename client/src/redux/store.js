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
import userReducer from "./userSlice";
import modalReducer from "./modal/modalSlice.js";
import authReducer from "./auth/authSlice.js";

const persistedWaterTodayReducer = persistReducer(
  {
    key: "water-today",
    storage,
  },
  waterTodayReducer
);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    waterToday: persistedWaterTodayReducer,
    changeMonth: changeMonthReducer,
    user: userReducer,
    modal: modalReducer,
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
