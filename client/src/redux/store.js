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
import waterTodayReducer from "./waterToday/waterTodayslice.js";
import userReducer from "./userSlice";

const persistedWaterTodayReducer = persistReducer(
  {
    key: "water-today",
    storage,
  },
  waterTodayReducer,
);

export const store = configureStore({
  reducer: {
    waterToday: persistedWaterTodayReducer,
    user: userReducer, // Додаємо редюсер користувача
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
