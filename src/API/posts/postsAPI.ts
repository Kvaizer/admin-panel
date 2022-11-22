import {instance} from '../instace';
import {CommentType, GetCommentsRequestParamsType} from './commentsTypes';
import {PostType} from './postTypes';
import {QueryPaginationParams} from '../commonTypes';


export const postsAPI = {
    getPosts({ start, end }: QueryPaginationParams) {
        return instance.get<Array<PostType>>(`posts?_start=${start}&_end=${end}`);
    },

    getCommentsById({postId, params = {start: 0, end: 10}}: GetCommentsRequestParamsType<QueryPaginationParams>) {
        return instance.get<Array<CommentType>>(`posts/${postId}/comments?_start=${params.start}&_end=${params.end}`)
    }
}