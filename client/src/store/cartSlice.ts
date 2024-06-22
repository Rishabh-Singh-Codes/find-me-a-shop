// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         items: [],
//         store: null,
//     },
//     reducers: {
//         addItem: (state, action) => {
//             if(state.store && action.payload.store !== state.store) {
//                 state.items.push(action.payload.item);
//                 state.store = action.payload.store;
//             }
//         }
//     }
// })

// export const {addItem} = cartSlice.actions; 
// export default cartSlice.reducer;