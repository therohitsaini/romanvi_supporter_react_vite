import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

export const fetchAdminData = createAsyncThunk(
    "admin/fetchAdminData",
    async (userId: string) => {
        const response = await api.get(`/api/patner/admin/partner/details/dashboard/${userId}`);
        console.log("Admin data fetched:", response.data);
        return response.data;
    }
);

export const fetchAdminUsers = createAsyncThunk(
    "admin/fetchAdminUsers",
    async (userId: string) => {
        const response = await api.get(`/api/patner/admin/partner/all/users/dashboard/${userId}`);
        return response.data;
    }
);

export const fetchAllUserConversions = createAsyncThunk(
    "admin/fetchAllUserConversions",
    async (userId: string) => {
        const response = await api.get(`/api/patner/admin/partner/all/conversations/dashboard/${userId}`);
        return response.data;
    }
);

const initialState = {
    admin: null,
    user: [],
    conversions: [],
    loading: false,
    error: null as string | null | undefined
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminData: (state, action) => {
            state.admin = action.payload;
            state.loading = false;
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
            })
            .addCase(fetchAdminUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchAdminUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllUserConversions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllUserConversions.fulfilled, (state, action) => {
                state.loading = false;
                state.conversions = action.payload;
            })
            .addCase(fetchAllUserConversions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }
});

export const { setAdminData } = adminSlice.actions;
export default adminSlice.reducer;