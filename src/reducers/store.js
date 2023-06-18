import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationReducer.js';
import blogsReducer from './blogsReducer.js';
import userReducer from './userReducer.js';
import usersReducer from './usersReducer.js';

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
        user: userReducer,
        users: usersReducer
    }
});