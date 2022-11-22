import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {initialPostsStateType, PostType} from '../../API/posts/postTypes';
import {QueryPaginationParams, StatusType} from '../../API/commonTypes';
import {postsAPI} from '../../API/posts/postsAPI';

const initialState: initialPostsStateType = {
    posts: [],
    status: StatusType.Idle,
    error: ''
};

export const fetchPosts = createAsyncThunk<{ posts: Array<PostType> }, QueryPaginationParams, { rejectValue: { error: string } }>('posts/fetchPosts',
    async (params = {start: 0, end: 5}, {rejectWithValue}) => {
    try {
        const res = await postsAPI.getPosts(params);
        return {posts: res.data}
    } catch (e: any) {
        return rejectWithValue({error: e.message})
    }
})

export const slice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = StatusType.InProgress;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = state.posts.concat(action.payload.posts);
                state.status = StatusType.Succeeded;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.error = action.payload?.error ? action.payload.error : 'Some error occurred';
                state.status = StatusType.Failed;
            })
    }
})

export const postsReducer = slice.reducer