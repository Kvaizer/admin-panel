import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CommentsInitialStateType, CommentType, GetCommentsRequestParamsType} from '../../../API/posts/commentsTypes';
import {QueryPaginationParams, StatusType} from '../../../API/commonTypes';
import {postsAPI} from '../../../API/posts/postsAPI';
import {AxiosError} from 'axios';
import {setAppError} from '../appReducer';

const initialState: CommentsInitialStateType = {
    comments: {},
    status: StatusType.Idle,
    offset: 2,
    isMore: true,
    error: ''
}

export const fetchCommentsByPostId = createAsyncThunk<{postId: number, comments: Array<CommentType>}, GetCommentsRequestParamsType<QueryPaginationParams>, { rejectValue: { error: string } }>('comments/fetchComments', async ({postId, params= {start: 0, end: 5}}, {dispatch, rejectWithValue}) => {
    try {
        const res = await postsAPI.getCommentsById({postId, params});
        const comments: CommentType[] = res.data;

        if(!comments.length) {
            dispatch(slice.actions.setIsMoreComments())
        }

        return {postId, comments};
    } catch(e) {
        const err = e as Error | AxiosError<{ error: string }>;
        dispatch(setAppError({error: err.message}));

        return rejectWithValue({error: err.message})
    }
})

export const slice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setIsMoreComments(state) {
            state.isMore = false
        },

        clearCommentsState() {
            return {...initialState}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByPostId.pending, (state) => {
            state.status = StatusType.InProgress;
        })
            .addCase(fetchCommentsByPostId.fulfilled, (state, {payload}) => {
                state.comments[payload.postId] = state.comments[payload.postId] ? state.comments[payload.postId].concat(payload.comments) : payload.comments;
                state.status = StatusType.Succeeded;
            })
            .addCase(fetchCommentsByPostId.rejected, (state, {payload}) => {
                state.error = payload?.error ? payload.error : 'Some error occurred';
                state.status = StatusType.Failed;
            })
    }
})

export const commentsReducer = slice.reducer;
export const {clearCommentsState} = slice.actions;