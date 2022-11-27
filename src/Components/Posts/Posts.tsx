import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {clearPostsState, fetchPosts} from '../../Store/reducers/posts/postsReducer';
import {Grid} from '@mui/material';
import Container from '@mui/material/Container';
import styles from './Posts.module.sass'
import {fetchUserById} from '../../Store/reducers/users/usersReducer';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {
    selectMyPosts,
    selectPosts,
    selectPostsOffset,
    selectPostsStatus,
    selectTotalCount
} from '../../Store/reducers/posts/selectors';
import {Post} from './Post/Post';
import {StatusType} from '../../API/commonTypes';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from '../features/ErrorSnackBar/ErrorSnackBar';
import { clearCommentsState } from '../../Store/reducers/posts/commentsReducer';

export const Posts = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const posts = useAppSelector(selectPosts);
    const myPosts = useAppSelector(selectMyPosts);
    const offset = useAppSelector(selectPostsOffset);
    const totalCount = useAppSelector(selectTotalCount);
    const status = useAppSelector(selectPostsStatus);

    const userIds = useMemo(() => Array.from(new Set(posts.map(post => post.userId))), [posts]);

    const [startValueForFetching, setStartValueForFetching] = useState(0);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fn = async () => {
            if (isFetching) {
                try {
                    await dispatch(fetchPosts({start: startValueForFetching, end: startValueForFetching + offset}));
                    setStartValueForFetching(startValueForFetching + offset);
                    setIsFetching(false);
                } catch (e: any) {
                    throw new Error(e.message)
                }
            }
        }
        fn();
    }, [isFetching])

    useEffect(() => {
        userIds.forEach(id => dispatch(fetchUserById(id)));
    }, [userIds])

    useEffect(() => {
        document.addEventListener('scroll', infiniteScrollHandler)

        return () => {
            document.removeEventListener('scroll', infiniteScrollHandler)
        }
    }, [totalCount])

    useEffect(() => {
        return () => {
            dispatch(clearPostsState());
            dispatch(clearCommentsState());
        }
    }, [])

    const block = useRef(null)

    const infiniteScrollHandler = useCallback(() => {
        if (!block.current) return;

        const {offsetHeight} = block.current;
        const yOffset = window.scrollY;
        const windowHeight = window.innerHeight;
        const y = yOffset + windowHeight;

        if (y >= offsetHeight - 100 && posts.length <= totalCount) {
            setIsFetching(true)
        }
    }, [isFetching, totalCount])

    const onAddPostButtonClickHandler = useCallback(() => {
        navigate('/posts/create');
    }, [])

    const postsComponents = useMemo(() => {
        const anyPosts = posts.map((post) => {
            return <Post key={post.id} post={post}/>
        });

        const userPosts = myPosts.map((post) => {
            return <Post key={post.id} post={post}/>
        })

        return userPosts.concat(...anyPosts)
    }, [posts, myPosts])

    return (
        <div onScroll={infiniteScrollHandler} ref={block}>
            <Button
                className={styles.button}
                sx={{
                    position: 'sticky',
                    top: '40px',
                    left: '15%',
                }}
                color={'success'}
                onClick={onAddPostButtonClickHandler}
                variant="contained">
                Add new post
            </Button>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                maxWidth="xl">
                {status === StatusType.InProgress ? <LinearProgress/> : null}
                <Grid
                    item
                    xs={6}
                    sx={{
                        margin: '20px'
                    }}
                    container
                    className={styles.postContainer}
                    rowSpacing={2}
                    direction={'column'}>
                    {postsComponents}
                </Grid>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}


