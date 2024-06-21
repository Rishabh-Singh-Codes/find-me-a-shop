import { configureStore } from "@reduxjs/toolkit";
import authSlice, { AuthState } from "./authSlice";
import toastSlice, { ToastState } from "./toastSlice";

export type RootStateType = {
    auth: AuthState,
    toast: ToastState
}

const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
  },
});

export default store;
