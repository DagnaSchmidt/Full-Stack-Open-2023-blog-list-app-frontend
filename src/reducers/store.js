import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationReducer.js';

export const store = configureStore({
    reducer: {
        notification: notificationReducer
    }
});