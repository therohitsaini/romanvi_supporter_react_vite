import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosApi from "../../components/Axios/AxoisApi";

interface AuthState {
    isAuth: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    isAuth: false,
    loading: true,
};

export const verifyToken = createAsyncThunk(
    "auth/verifyToken",
    async (_, { rejectWithValue }) => {
        console.log("Verifying token...");
        try {
            const res = await AxiosApi.post("/api/auth/verify/auth/user");
            return res.data;
        } catch (err) {
            return rejectWithValue("Invalid token");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("__Access_Token_v2");
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuth = action.payload.valid;
            })
            .addCase(verifyToken.rejected, (state) => {
                state.loading = false;
                state.isAuth = false;
                localStorage.removeItem("__Access_Token_v2");
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;