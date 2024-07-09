import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import timeLineService from "../services/timeLineService";

const initialState = {
    timeLines: {},
    timeLine: {},
    error: false,
    success: false,
    loading: false,
    message: null
};

export const registerTimeLine = createAsyncThunk(
    "timeLine/register",
    async (timeLine, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;
        const data = await timeLineService.registerTimeLine(timeLine, token);
        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const updateTimeLine = createAsyncThunk(
    "timeLine/update",
    async (timeLine, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;
        const data = await timeLineService.updateTimeLine(timeLine._id, timeLine, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const deleteTimeLine = createAsyncThunk(
    "timeLine/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.admin.token;

        const data = await timeLineService.deleteTimeLine(id, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const getTimeLines = createAsyncThunk(
    "timeLine/all",
    async (thunkAPI) => {

        const data = await timeLineService.getTimeLines();

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const getTimeLineDetails = createAsyncThunk(
    "timeLine/id",
    async (id) => {
        const data = await timeLineService.getTimeLineById(id);
        return data;
    }
);

export const searchTimeLines = createAsyncThunk(
    "timeLine/search",
    async (query, thunkAPI) => {

        const data = await timeLineService.searchTimeLines(query);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);


export const timeLineSlice = createSlice({
    name: 'timeLine',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTimeLines.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getTimeLines.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.timeLines = action.payload;
        }).addCase(getTimeLineDetails.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getTimeLineDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.timeLine = action.payload;
        }).addCase(updateTimeLine.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(updateTimeLine.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.timeLine = action.payload;
            state.message = "Linha do tempo atualizada com sucesso!";
        }).addCase(updateTimeLine.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.timeLine = {};
        }).addCase(registerTimeLine.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(registerTimeLine.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.timeLine = action.payload;
            state.timeLines.unshift(state.timeLines);
            state.message = "Linha do tempo registrada com sucesso!";
        }).addCase(registerTimeLine.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.timeLine = {};
        }).addCase(deleteTimeLine.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(deleteTimeLine.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.timeLine = action.payload;
            state.timeLines = state.timeLines.filter((item) => {
                return item._id !== action.payload.id;
            });
            state.message = action.payload.message;
        }).addCase(deleteTimeLine.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.timeLine = {};
        }).addCase(searchTimeLines.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(searchTimeLines.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.timeLines = action.payload;
        })
    }
});

export const { resetMessage } = timeLineSlice.actions;
export default timeLineSlice.reducer;