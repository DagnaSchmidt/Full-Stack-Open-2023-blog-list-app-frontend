import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../services/users.js';

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        // eslint-disable-next-line
        setUsers(state, action) {
            return action.payload;
        }
    }
});

export const getUsers = () => {
    return async dispatch => {
        const newUsers = await getAllUsers();
        dispatch(setUsers(newUsers));
    };
};

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;