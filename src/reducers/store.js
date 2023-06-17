import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationReducer.js';
import blogsReducer from './blogsReducer.js';

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer
    }
});