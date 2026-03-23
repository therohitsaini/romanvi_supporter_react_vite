import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../slice/adminSlice";
import authReducer from "../slice/authSlice";

export const store = configureStore({
    reducer: {
        admin: adminReducer,
         auth: authReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;