import { createSlice } from '@reduxjs/toolkit';
import { login } from '../services/login.js';
import { setToken } from '../services/blogs.js';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        // eslint-disable-next-line
        setUser(state, action) {
            return action.payload;
        },
        // eslint-disable-next-line
        logOutUser(state, action) {
            return null;
        }
    }
});

export const saveUser = (credentials) => {
    return async dispatch => {
        const newUser = await login(credentials);
        setToken(newUser.token);
        dispatch(setUser(newUser));
    };
};

export const removeUser = () => {
    return async dispatch => {
        setToken(null);
        dispatch(logOutUser());
    };
};


export const { setUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;