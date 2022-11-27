import {AppRootStateType} from '../../store';

export const selectPosts = (state: AppRootStateType) => state.postsState.posts;

export const selectMyPosts = (state: AppRootStateType) => state.postsState.myPosts;

export const selectPostsOffset = (state: AppRootStateType) => state.postsState.offset;

export const selectTotalCount = (state: AppRootStateType) => state.postsState.totalCount;

export const selectCurrentPost = (state: AppRootStateType, params: {postId: number}) => {
    if(params.postId <= 100) {
        return state.postsState.posts.find(item => item.id === params.postId)
    } else {
        return state.postsState.myPosts.find(item => item.id === params.postId)
    }
};

export const selectCommentsByPostId = (state: AppRootStateType, params: {postId: number}) => state.commentsState.comments[params.postId];

export const selectCommentsOffset = (state: AppRootStateType) => state.commentsState.offset;

export const selectIsMoreCommentsForFetching = (state: AppRootStateType) => state.commentsState.isMore

export const selectTotalCountOfPostComments = (state: AppRootStateType) => state.commentsState.totalCount

export const selectPostsStatus = (state: AppRootStateType) => state.postsState.status

