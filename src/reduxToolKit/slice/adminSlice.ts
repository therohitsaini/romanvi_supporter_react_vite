import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminData = createAsyncThunk(
    "admin/fetchAdminData",
    async (userId: string) => {
        const response = await axios.get(`${"http://localhost:5000"}/api/patner/admin/partner/details/dashboard/${userId}`);
        console.log(response.data, "admin data in fetchAdminData");
        return response.data;
    }
);

const initialState = {
    admin: null,
    loading: false,
    error: null as string | null | undefined
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminData: (state, action) => {
            state.admin = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminData.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload;
            })
            .addCase(fetchAdminData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setAdminData } = adminSlice.actions;
export default adminSlice.reducer;