import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import artistsService from "../services/artistsService";

const initialState = {
    artists: {},
    artist: {},
    error: false,
    success: false,
    loading: false,
    message: null
};

export const registerArtist = createAsyncThunk(
    "artist/register",
    async (artist, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;
        const data = await artistsService.registerArtist(artist, token);
        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const updateArtist= createAsyncThunk(
    "artist/update",
    async (artist, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;
        const id = artist.get("_id");
        const data = await artistsService.updateArtist(id, artist, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const deleteArtist = createAsyncThunk(
    "artist/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;

        const data = await artistsService.deleteArtist(id, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const getArtists = createAsyncThunk(
    "artist/all",
    async (thunkAPI) => {

        const data = await artistsService.getArtists();

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const getArtistDetails = createAsyncThunk(
    "artist/id",
    async (id) => {
        const data = await artistsService.getArtistDetails(id);
        return data;
    }
);


export const searchArtists = createAsyncThunk(
    "artist/search",
    async (query, thunkAPI) => {

        const data = await artistsService.searchArtists(query);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);


export const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getArtists.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getArtists.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.artists = action.payload;
        }).addCase(getArtistDetails.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getArtistDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.artist = action.payload;
        }).addCase(updateArtist.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(updateArtist.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.artist = action.payload;
            state.message = "Artista atualizado com sucesso!";
        }).addCase(updateArtist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.artist = {};
        }).addCase(registerArtist.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(registerArtist.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.artist = action.payload;
            state.artists.unshift(state.artist);
            state.message = "Artista registrado com sucesso!";
        }).addCase(registerArtist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.artist = {};
        }).addCase(deleteArtist.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(deleteArtist.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.artist = action.payload;
            state.artists = state.artists.filter((item) => {
                return item._id !== action.payload.id;
            });
            state.message = action.payload.message;
        }).addCase(deleteArtist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.artist = {};
        }).addCase(searchArtists.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(searchArtists.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.artists = action.payload;
        })
    }
});

export const { resetMessage } = artistSlice.actions;
export default artistSlice.reducer;