import React, {useCallback, useMemo, useState} from 'react';
import {PostComponentPropsType} from '../../../API/posts/postTypes';
import Grid from '@mui/material/Grid';
import styles from './Post.module.sass'
import {useAppDispatch, useAppSelector} from '../../../utils/hooks';
import {Button} from '@mui/material';
import {clearCommentsState, fetchCommentsByPostId} from '../../../Store/reducers/commentsReducer';
import Comment from '../../Comment/Comment';
import Paper from '@mui/material/Paper';
import UserInPost from '../../User/UserInPost';
import {deletePost} from '../../../Store/reducers/postsReducer';
import {ModalWindow} from '../../features/Modal/Modal';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom';

const Post: React.FC<PostComponentPropsType> = React.memo(({post, ref}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const comments = useAppSelector(state => state.commentsState.comments[post.id]);
    const offset = useAppSelector(state => state.commentsState.offset);
    const isMore = useAppSelector(state => state.commentsState.isMore);

    const [startValue, setStartValue] = useState<number>(0);

    const showCommentsButtonHandler = useCallback(() => {
        dispatch(fetchCommentsByPostId({postId: post.id, params: {start: startValue, end: startValue + offset}}));
        setStartValue(startValue + offset);
    }, [post.id, startValue]);

    const commentsTsx = useMemo(() => comments ? Object.values(comments).map((comment, index) => {
        return <Comment key={index} comment={comment}/>
    }) : [], [comments]);

    const hideCommentsButtonHandler = useCallback(() => {
        setStartValue(0);
        dispatch(clearCommentsState());
    }, [])

    const deleteButtonHandler = useCallback(() => {
        dispatch(deletePost(post.id))
    }, [])

    const updateButtonHandler = useCallback(() => {
        navigate(`${post.id}`)
    }, [])

    return (
        <Paper elevation={6} className={styles.wrapper}>
            <Grid key={post.id} container className={styles.container} direction={'column'}
                  style={{margin: '10px auto'}}>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <div className={styles.userName}><UserInPost userId={post.userId}/></div>
                        <div className={styles.buttonContainer}>
                            <IconButton onClick={updateButtonHandler}>
                                <EditIcon/>
                            </IconButton>
                            <ModalWindow title={'delete'}
                                         description={'Do yo really want to remove this post?'}
                                         children={
                                             <Button
                                                 key={post.id}
                                                 onClick={deleteButtonHandler}
                                                 style={{borderRadius: '30px'}}
                                                 sx={{mt: 3, mb: 2}}
                                                 variant={'contained'}
                                                 color={'error'}
                                                 size={'small'}
                                             >Delete</Button>
                                         }/>
                        </div>
                    </div>
                    <div className={styles.title}>{post.title}</div>
                </div>
                <div className={styles.body}>{post.body}</div>
                <div className={styles.footer}>
                    <Grid container direction={'column'}>
                        {commentsTsx}
                    </Grid>
                    <div className={styles.buttonContainer}>
                        <Button
                            disabled={!startValue}
                            onClick={hideCommentsButtonHandler}
                            className={styles.button}
                            variant={'contained'}
                            color={'success'}>
                            Hide Comments
                        </Button>
                        <Button
                            disabled={!isMore}
                            onClick={showCommentsButtonHandler}
                            className={styles.button}
                            variant={'contained'}
                            color={'success'}>
                            {comments ? isMore ? 'Show more' : 'No more comments' : 'Show comments'}
                        </Button>
                    </div>
                </div>
            </Grid>
        </Paper>
    );
})

export default Post;