import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        // eslint-disable-next-line
        setErrorMessage(state, action) {
            return {
                title: action.payload,
                border: 'red'
            };
        },
        // eslint-disable-next-line
        setSuccessMessage(state, action) {
            return {
                title: action.payload,
                border: 'green'
            };
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

export const showSuccessMessage = (content) => {
    return dispatch => {
        dispatch(setSuccessMessage(content));
        setTimeout(() => {
            dispatch(clearErrorMessage());
        }, 5000);
    };
};

export const { setErrorMessage, clearErrorMessage, setSuccessMessage } = notificationSlice.actions;
export default notificationSlice.reducer;