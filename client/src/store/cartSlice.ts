import { CartItemType } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

export type CartState = {
    items: CartItemType[];
    store: string | null;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(sessionStorage.getItem("cartItems") || "[]"),
    store: sessionStorage.getItem("selectedStore") || null,
  } as CartState,
  reducers: {
    addItem: (state, action) => {
      const { store, item } = action.payload;
      const existingItem = state.items.find(i => i.itemId === item.itemId);

      if (!state.store && state.items.length === 0) {
        state.store = store;
        sessionStorage.setItem("selectedStore", store);
        if (existingItem) {
          existingItem.itemQty += 1;
        } else {
          state.items.push({ ...item, itemQty: 1 });
        }
        sessionStorage.setItem("cartItems", JSON.stringify(state.items));
      } else if (state.store && store === state.store) {
        if (existingItem) {
          existingItem.itemQty += 1;
        } else {
          state.items.push({ ...item, itemQty: 1 });
        }
        sessionStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    removeItem: (state, action) => {
      const { itemId } = action.payload;
      const existingItem = state.items.find(item => item.itemId === itemId);

      if (existingItem) {
        if (existingItem.itemQty > 1) {
          existingItem.itemQty -= 1;
        } else {
          state.items = state.items.filter(item => item.itemId !== itemId);
        }
        sessionStorage.setItem("cartItems", JSON.stringify(state.items));
        if (state.items.length === 0) {
          state.store = null;
          sessionStorage.removeItem("selectedStore");
        }
      }
    },
    clearCart: (state) => {
        state.items = [];
        sessionStorage.removeItem("cartItems");
        state.store = null;
        sessionStorage.removeItem("selectedStore");
    }
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
