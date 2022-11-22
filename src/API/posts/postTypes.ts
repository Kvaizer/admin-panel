import {StatusType} from '../commonTypes';

export type PostType = {
    userId: number,
    id: number,
    title: string,
    body: string
}


export type initialPostsStateType = {
    posts: Array<PostType>
    status: StatusType,
    error: string,
}

export type PostComponentPropsType = {
    post: PostType
}


