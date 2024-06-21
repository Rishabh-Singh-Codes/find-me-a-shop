import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
    isLoggedIn: boolean;
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    } as AuthState,
    reducers: {
        setUserLoggedIn: (state) => {
            state.isLoggedIn = true;
        },
        setUserLoggedOut: (state) => {
            state.isLoggedIn = false;
        },
    }
});

export const {setUserLoggedIn, setUserLoggedOut} = authSlice.actions;
export default authSlice.reducer;