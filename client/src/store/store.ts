import { configureStore } from "@reduxjs/toolkit";
import authSlice, { AuthState } from "./authSlice";
import toastSlice, { ToastState } from "./toastSlice";
import cartSlice, { CartState } from "./cartSlice";

export type RootStateType = {
  auth: AuthState;
  toast: ToastState;
  cart: CartState;
};

const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['auth.stripePromise'],
      },
    }),
});

export default store;
