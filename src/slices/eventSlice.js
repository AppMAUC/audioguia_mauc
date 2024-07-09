import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "../services/eventService";

const initialState = {
    events: {},
    event: {},
    error: false,
    success: false,
    loading: false,
    message: null
};

export const registerEvent = createAsyncThunk(
    "event/register",
    async (event, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;
        const data = await eventService.registerEvent(event, token);
        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const updateEvent = createAsyncThunk(
    "event/update",
    async (event, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;
        const id = event.get("_id");
        const data = await eventService.updateEvent(id, event, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const deleteEvent = createAsyncThunk(
    "event/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;

        const data = await eventService.deleteEvent(id, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const getEvents = createAsyncThunk(
    "event/all",
    async (thunkAPI) => {

        const data = await eventService.getEvents();

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const getEventDetails = createAsyncThunk(
    "event/id",
    async (id) => {
        const data = await eventService.getEventById(id);
        return data;
    }
);

export const searchEvents = createAsyncThunk(
    "event/search",
    async (query, thunkAPI) => {

        const data = await eventService.searchEvents(query);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);


export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEvents.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.events = action.payload;
        }).addCase(getEventDetails.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getEventDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.event = action.payload;
        }).addCase(updateEvent.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(updateEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.event = action.payload;
            state.message = "Evento atualizado com sucesso!";
        }).addCase(updateEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.event = {};
        }).addCase(registerEvent.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(registerEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.event = action.payload;
            state.events.unshift(state.events);
            state.message = "Evento registrado com sucesso!";
        }).addCase(registerEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.event = {};
        }).addCase(deleteEvent.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(deleteEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.event = action.payload;
            state.events = state.events.filter((item) => {
                return item._id !== action.payload.id;
            });
            state.message = action.payload.message;
        }).addCase(deleteEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.event = {};
        }).addCase(searchEvents.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(searchEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.events = action.payload;
        })
    }
});

export const { resetMessage } = eventSlice.actions;
export default eventSlice.reducer;