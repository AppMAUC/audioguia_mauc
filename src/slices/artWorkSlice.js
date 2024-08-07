import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import artWorkService from "../services/artWorkService";
import { formatDate } from "../utils/formatDate";

const initialState = {
    artWorks: [],
    artWork: {},
    error: false,
    success: false,
    loading: false,
    message: null
};

export const registerArtWork = createAsyncThunk(
    "artWork/register",
    async (artWork, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;
        const data = await artWorkService.registerArtWork(artWork, token);
        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const updateArtWork = createAsyncThunk(
    "artWork/update",
    async ({ newData, id }, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;
        const data = await artWorkService.updateArtWork(id, newData, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const deleteArtWork = createAsyncThunk(
    "artWork/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;

        const data = await artWorkService.deleteArtWork(id, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

// Get artwork details
export const getArtWorks = createAsyncThunk(
    "artWork/all",
    async (thunkAPI) => {

        const data = await artWorkService.getArtWorks();

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const getArtWorkDetails = createAsyncThunk(
    "artWork/id",
    async (id) => {
        const data = await artWorkService.getArtWorkDetails(id);
        return data;
    }
);


export const searchArtWorks = createAsyncThunk(
    "artWork/search",
    async (query, thunkAPI) => {

        const data = await artWorkService.searchArtWorks(query);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);


export const artWorkSlice = createSlice({
    name: 'artWork',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
        resetArtWork: (state) => {
            state.artWork = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getArtWorks.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getArtWorks.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.artWorks = action.payload;
        }).addCase(getArtWorkDetails.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getArtWorkDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.artWork = action.payload;
        }).addCase(updateArtWork.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(updateArtWork.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.artWork = action.payload;
            state.message = "Obra de Arte atualizada com sucesso!";
        }).addCase(updateArtWork.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.artWork = {};
        }).addCase(registerArtWork.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(registerArtWork.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.artWork = action.payload;
            state.artWorks.unshift(state.artWork);
            state.message = "Obra de Arte registrada com sucesso!";
        }).addCase(registerArtWork.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.artWork = {};
        }).addCase(deleteArtWork.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(deleteArtWork.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.artWork = action.payload;
            state.artWorks = state.artWorks.filter((item) => {
                return item._id !== action.payload.id;
            });
            state.message = action.payload.message;
        }).addCase(deleteArtWork.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.artWork = {};
        }).addCase(searchArtWorks.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(searchArtWorks.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.artWorks = action.payload;
        })
    }
});

export const { resetMessage, resetArtWork } = artWorkSlice.actions;
export default artWorkSlice.reducer;