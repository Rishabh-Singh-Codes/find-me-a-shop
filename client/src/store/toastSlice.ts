import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ToastState = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

const toastSlice = createSlice({
  name: "toast",
  initialState: null as ToastState | null,
  reducers: {
    showToast: (_state, action: PayloadAction<ToastState>) => action.payload,
    hideToast: () => null,
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
