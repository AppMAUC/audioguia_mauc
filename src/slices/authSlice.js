import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

// const admin = verify();
const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
    admin: admin ? admin : null,
    error: false,
    success: false,
    loading: false,
    token: admin ? admin.isValid : false,
};

// Register any admin
export const register = createAsyncThunk("auth/register",
    async (admin, thunkAPI) => {
        const data = await authService.register(admin);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

// Sing in
export const login = createAsyncThunk("auth/login",
    async (admin, thunkAPI) => {
        const data = await authService.login(admin);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };
        return data;
    }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

export const verifyToken = createAsyncThunk(
    'admin/verifyToken',
    async (thunkAPI) => {
        const token = JSON.parse(localStorage.getItem("admin"));
        const res = await authService.verifyToken(token);

        if (res.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return res;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.admin = action.payload;
            state.token = true;
        }).addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.admin = null;
        }).addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.admin = null;
        }).addCase(login.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.admin = action.payload;
            state.token = true;
        }).addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.admin = null;
        })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;