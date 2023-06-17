import { configureStore } from '@reduxjs/toolkit';
import errorMessageReducer from './errorMessageReducer.js';
// import notificationReducer from './reducers/notificationReducer';

export const store = configureStore({
    reducer: {
        error: errorMessageReducer
    }
});