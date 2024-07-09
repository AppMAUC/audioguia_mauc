import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expositionService from "../services/expositionService";

const initialState = {
    expositions: {},
    exposition: {},
    error: false,
    success: false,
    loading: false,
    message: null
};

export const registerExposition = createAsyncThunk(
    "exposition/register",
    async (exposition, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;
        const data = await expositionService.registerExposition(exposition, token);
        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const updateExposition = createAsyncThunk(
    "exposition/update",
    async (exposition, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;
        const data = await expositionService.updateExposition(exposition._id, exposition, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const deleteExposition = createAsyncThunk(
    "exposition/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;

        const data = await expositionService.deleteExposition(id, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const getExpositions = createAsyncThunk(
    "exposition/all",
    async (thunkAPI) => {

        const data = await expositionService.getExpositions();

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const getExpositionDetails = createAsyncThunk(
    "exposition/id",
    async (id) => {
        const data = await expositionService.getExpositionById(id);
        return data;
    }
);

export const searchExposition = createAsyncThunk(
    "exposition/search",
    async (query, thunkAPI) => {

        const data = await expositionService.searchExpositions(query);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);


export const expositionSlice = createSlice({
    name: 'exposition',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getExpositions.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getExpositions.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.expositions = action.payload;
        }).addCase(getExpositionDetails.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getExpositionDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.exposition = action.payload;
        }).addCase(updateExposition.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(updateExposition.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.exposition = action.payload;
            state.message = "Exposição atualizada com sucesso!";
        }).addCase(updateExposition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.exposition = {};
        }).addCase(registerExposition.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(registerExposition.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.exposition = action.payload;
            state.expositions.unshift(state.exposition);
            state.message = "Exposição registrada com sucesso!";
        }).addCase(registerExposition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.exposition = {};
        }).addCase(deleteExposition.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(deleteExposition.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.exposition = action.payload;
            state.expositions = state.expositions.filter((item) => {
                return item._id !== action.payload.id;
            });
            state.message = action.payload.message;
        }).addCase(deleteExposition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.exposition = {};
        }).addCase(searchExposition.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(searchExposition.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.expositions = action.payload;
        })
    }
});

export const { resetMessage } = expositionSlice.actions;
export default expositionSlice.reducer;