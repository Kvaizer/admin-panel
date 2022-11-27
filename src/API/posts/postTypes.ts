import {StatusType} from '../commonTypes';
import {RefObject} from 'react';


export type PostType = {
    userId: number,
    id: number,
    title: string,
    body: string
}


export type InitialPostsStateType = {
    posts: Array<PostType>
    status: StatusType,
    offset: number,
    totalCount: number,
    myPosts: Array<PostType>
    error: string,
}

export type PostComponentPropsType = {
    post: PostType
    ref?: RefObject<unknown>
}

export type NewPostFormikErrorType = {
    title?: string
    body?: string
    userId?: string
}

export type CreatePostRequestType = {
    body: string,
    title: string,
    userId: number
}

export type PostFormPropsType = {
    onButtonHandler?: (post: PostType) => void
}
