import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/store/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
