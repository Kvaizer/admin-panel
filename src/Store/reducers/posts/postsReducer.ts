import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CreatePostRequestType, InitialPostsStateType, PostType} from '../../../API/posts/postTypes';
import {QueryPaginationParams, StatusType} from '../../../API/commonTypes';
import {postsAPI} from '../../../API/posts/postsAPI';
import {AxiosError} from 'axios';
import {setAppError} from '../appReducer';

const initialState: InitialPostsStateType = {
    posts: [],
    myPosts: [],
    status: StatusType.Idle,
    offset: 5,
    totalCount: 0,
    error: '',
};

export const setPostsStatus = createAction<{ status: StatusType }>('postActions/setPostsStatus');
export const clearPostsState = createAction('postAction/clearPostsState');

export const fetchPosts = createAsyncThunk<{ posts: Array<PostType>, totalCount?: string }, QueryPaginationParams, { rejectValue: { error: string } }>('posts/fetchPosts',
    async (params = {start: 0, end: 5}, {dispatch, rejectWithValue}) => {
        dispatch(setPostsStatus({status: StatusType.InProgress}))

        try {
            const res = await postsAPI.getPosts(params);
            dispatch(setPostsStatus({status: StatusType.Succeeded}))
            const totalCount = res.headers['x-total-count'];

            return {posts: res.data, totalCount}
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>;
            dispatch(setPostsStatus({status: StatusType.Failed}));
            dispatch(setAppError({error: err.message}));

            return rejectWithValue({error: err.message})
        }
    })

export const createNewPost = createAsyncThunk<{ newPost: PostType }, CreatePostRequestType, { rejectValue: { error: string } }>('posts/createPost',
    async (newPost, {dispatch, rejectWithValue}) => {
        dispatch(setPostsStatus({status: StatusType.InProgress}))

        try {
            const res = await postsAPI.createNewPost(newPost);

            dispatch(setPostsStatus({status: StatusType.Succeeded}))

            return {
                newPost: {
                    ...newPost,
                    id: res.data.id,
                    userId: 100,
                }
            }
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>;
            dispatch(setPostsStatus({status: StatusType.Failed}));
            dispatch(setAppError({error: err.message}));

            return rejectWithValue({error: err.message});
        }
    }
)

export const updatePost = createAsyncThunk<{ updatedPost: PostType },  PostType, { rejectValue: { error: string, updatedPost: PostType } }>('posts/updatePost',
    async (post, {dispatch, rejectWithValue}) => {
        dispatch(setPostsStatus({status: StatusType.InProgress}));

        try {
            await  postsAPI.updatePost(post); // в респонсе приходит только postId, поэтому игнорируем и возвращаем отредактированный пост который получили в параметрах
            dispatch(setPostsStatus({status: StatusType.Succeeded}));

            return {updatedPost: post};
        } catch(e) {
            const err = e as Error | AxiosError<{ error: string }>;
            dispatch(setPostsStatus({status: StatusType.Failed}));

            return rejectWithValue({error: err.message, updatedPost: post});
        }
    })

export const deletePost = createAsyncThunk<{ postId: number }, number, { rejectValue: { error: string } }>('posts/deletePost',
    async (postId, {dispatch, rejectWithValue}) => {
        dispatch(setPostsStatus({status: StatusType.InProgress}));

        try {
            await postsAPI.deletePost(postId)
            dispatch(setPostsStatus({status: StatusType.Succeeded}));

            return {postId}
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>;
            dispatch(setPostsStatus({status: StatusType.Failed}));
            dispatch(setAppError({error: err.message}));

            return rejectWithValue({error: err.message});
        }
    })

export const slice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(setPostsStatus, (state, {payload}) => {
                state.status = payload.status;
            })

            .addCase(fetchPosts.fulfilled, (state, {payload}) => {
                state.posts = state.posts.concat(payload.posts);
                state.totalCount = Number(payload.totalCount);
            })

            .addCase(fetchPosts.rejected, (state, {payload}) => {
                state.error = payload?.error ? payload.error : 'Some error occurred';
            })

            .addCase(createNewPost.fulfilled, (state, {payload}) => {
                state.myPosts = [({...payload.newPost, id: Math.floor(Math.random() * 1000 + 101)}), ...state.myPosts]
            })

            .addCase(createNewPost.rejected, (state, {payload}) => {
                state.error = payload?.error ? payload.error : 'Some error occurred';
            })

            .addCase(createNewPost.pending, (state) => {
                state.posts = [];
            })

            .addCase(updatePost.fulfilled, (state, {payload}) => {
               const updatedPostIndex = state.posts.findIndex(item => item.id === payload.updatedPost.id);
               if(updatedPostIndex >= 0) {
                   state.posts[updatedPostIndex] = payload.updatedPost;
               }
            })

            .addCase(updatePost.rejected, (state, {payload}) => {
                const indexOfPostCreatedByUser = state.myPosts.findIndex(post => post.id === payload?.updatedPost.id);

                if(payload?.updatedPost.id && indexOfPostCreatedByUser >= 0) {
                    state.myPosts[indexOfPostCreatedByUser] = payload?.updatedPost;
                    console.log(state.posts[indexOfPostCreatedByUser], payload?.updatedPost)
                }

                state.error = payload?.error ? payload.error : 'Some error occurred';
            })

            .addCase(deletePost.fulfilled, (state, {payload}) => {
                if(payload.postId <= 100) {
                    state.posts = state.posts.filter(item => item.id !== payload.postId);
                } else {
                    state.myPosts = state.myPosts.filter(item => item.id !== payload.postId)
                }
            })

            .addCase(deletePost.rejected, (state, {payload}) => {
                state.error = payload?.error ? payload.error : 'Some error occurred';
            })

            .addCase(clearPostsState, (state) => {
                state.posts = []
            })
    }
})


export const postsReducer = slice.reducer