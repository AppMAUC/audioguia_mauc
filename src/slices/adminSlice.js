import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from '../services/adminService';

const initialState = {
    admin: {},
    admins: [],
    error: false,
    success: false,
    loading: false,
    message: null
};

export const updateProfile = createAsyncThunk(
    "admin/update",
    async (admin, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;

        const data = await adminService.updateProfile(admin, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

// Get all admins
export const admins = createAsyncThunk(
    "admin/all",
    async (thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;

        const data = await adminService.admins(token);

        return data;
    }
);

export const getAdminById = createAsyncThunk(
    "admin/id",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;
        const data = await adminService.getAdminById(id, token);

        return data;
    }
);

// Get admin details
export const profile = createAsyncThunk(
    "admin/profile",
    async (_, thunkAPI) => {

        const token = thunkAPI.getState().auth.admin.token;
        const data = await adminService.profile(token);

        return data;
    }
);

// Functions

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(profile.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(profile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.admin = action.payload;
        }).addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.admin = action.payload;
            state.message = "Administrador atualizado com sucesso!";
        }).addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.admin = {};
        }).addCase(admins.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(admins.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.admins = action.payload;
        }).addCase(getAdminById.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getAdminById.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.admin = action.payload;
        })
    }
});

export const { resetMessage } = adminSlice.actions;
export default adminSlice.reducer;