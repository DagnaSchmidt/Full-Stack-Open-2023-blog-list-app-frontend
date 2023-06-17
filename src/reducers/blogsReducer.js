import { createSlice } from '@reduxjs/toolkit';
import { getAll, create } from '../services/blogs.js';

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        // eslint-disable-next-line
        setAllBlogs(state, action) {
            return action.payload;
        },
        appendBlog(state, action) {
            return [...state, action.payload];
        }
    }
});

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await getAll();
        dispatch(setAllBlogs(blogs));
    };
};

export const addNewBlog =  (content) => {
    return async dispatch => {
        const newBlog = await create(content);
        dispatch(appendBlog(newBlog));
    };
};

export const { setAllBlogs, appendBlog } = blogsSlice.actions;
export default blogsSlice.reducer;