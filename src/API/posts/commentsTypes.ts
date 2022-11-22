import {StatusType} from '../commonTypes';

export type CommentType = {
    postId: number
    id: number
    name: string,
    email: string,
    body: string
}

export type GetCommentsRequestParamsType<D> = {
    postId: number
    params?: D
}

export type CommentsInitialStateType = {
    comments: {
        [postId: number]: Array<CommentType>
    }
    status: StatusType
    offset: number
    isMore: boolean
    error: string
}

export type CommentPropsType = {
    comment: CommentType
}