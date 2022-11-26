import {instance} from '../instace';
import {CommentType, GetCommentsRequestParamsType} from './commentsTypes';
import {CreatePostRequestType, PostType} from './postTypes';
import {QueryPaginationParams} from '../commonTypes';


export const postsAPI = {
    getPosts({ start, end }: QueryPaginationParams) {
        return instance.get<Array<PostType>>(`posts?_start=${start}&_end=${end}`);
    },

    createNewPost(newPost: CreatePostRequestType) {
        return instance.post<PostType>(`posts`, newPost)
    },

    updatePost(post: PostType) {
        return instance.put<PostType>(`posts/${post.id}`, post)
    },

    deletePost(postId: number) {
        return instance.delete(`posts/${postId}`);
    },


    getCommentsById({postId, params = {start: 0, end: 10}}: GetCommentsRequestParamsType<QueryPaginationParams>) {
        return instance.get<Array<CommentType>>(`posts/${postId}/comments?_start=${params.start}&_end=${params.end}`)
    }
}