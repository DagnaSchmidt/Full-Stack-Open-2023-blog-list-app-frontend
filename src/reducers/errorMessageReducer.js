import { createSlice } from '@reduxjs/toolkit';

const errorMessageSlice = createSlice({
    name: 'error',
    initialState: null,
    reducers: {
        setErrorMessage(action) {
            return action.payload;
        },
        clearErrorMessage() {
            return null;
        }
    }
});

export const showErrorMessage = (content) => {
    return dispatch => {
        dispatch(setErrorMessage(content));
        setTimeout(() => {
            dispatch(clearErrorMessage());
        }, 5000);
    };
};

export const { setErrorMessage, clearErrorMessage } = errorMessageSlice.actions;
export default errorMessageSlice.reducer;