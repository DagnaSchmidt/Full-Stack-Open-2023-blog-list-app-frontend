import { createSlice } from '@reduxjs/toolkit';
import { getAll, create, remove, update } from '../services/blogs.js';

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
        },
        removeBlog(state, action) {
            const newState = state.filter(i => i.id !== action.payload);
            return newState;
        },
        updateBlog(state, action) {
            const newState = state.map(i => {
                if(i.id !== action.payload){
                    return i;
                }else{
                    return {
                        ...i,
                        likes: i.likes + 1
                    };
                }
            });
            return newState;
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

export const deleteBlog = (id) => {
    return async dispatch => {
        await remove(id);
        dispatch(removeBlog(id));
    };
};

export const voteOnBlog = (id) => {
    return async dispatch => {
        await update(id);
        dispatch(updateBlog(id));
    };
};

export const { setAllBlogs, appendBlog, removeBlog, updateBlog } = blogsSlice.actions;
export default blogsSlice.reducer;