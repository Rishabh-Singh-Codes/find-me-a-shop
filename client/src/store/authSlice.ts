import { createSlice } from "@reduxjs/toolkit";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export type AuthState = {
    isLoggedIn: boolean;
    stripePromise: Promise<Stripe | null>;
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        stripePromise
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