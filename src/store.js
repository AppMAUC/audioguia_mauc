import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import artWorkReducer from './slices/artWorkSlice';
import expositionReducer from './slices/expositionSlice';
import artistReducer from './slices/artistSlice';
import eventReducer from './slices/eventSlice';
import timeLineReducer from './slices/timeLineSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        artWork: artWorkReducer,
        exposition: expositionReducer,
        artist: artistReducer,
        event: eventReducer,
        timeLine: timeLineReducer
    }
});