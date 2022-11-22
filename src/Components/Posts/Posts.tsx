import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {fetchPosts} from '../../Store/reducers/postsReducer';
import {Grid} from '@mui/material';
import Container from '@mui/material/Container';
import styles from './Posts.module.sass'
import Post from './Post/Post';
import {fetchUserById} from '../../Store/reducers/usersReducer';

export const Posts = React.memo(() => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector(state => state.postsState.posts)

    const userIds = useMemo(() => Array.from(new Set(posts.map(post => post.userId))), [posts])

    useEffect(() => {
        dispatch(fetchPosts({start: 0, end: 5}));
    }, [])

    useEffect(() => {
        userIds.forEach(id => dispatch(fetchUserById(id)));
    }, [userIds])

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            maxWidth="xl">
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
                {posts.map((post, index) => {
                    return <Post key={index} post={post}/>
                })}
            </Grid>
        </Container>
    );
})

