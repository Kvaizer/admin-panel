import React, {useCallback, useState} from 'react';
import {useFormik} from 'formik';
import {NewPostFormikErrorType, PostFormPropsType} from '../../../API/posts/postTypes';
import {Grid} from '@mui/material';
import styles from './PostForm.module.sass'
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {useAppDispatch, useAppSelector} from '../../../utils/hooks';
import {clearPostsState, createNewPost, updatePost} from '../../../Store/reducers/postsReducer';
import { useNavigate, useParams } from 'react-router-dom';

export const PostForm: React.FC = React.memo(() => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();

    const post = useAppSelector(state => {
      if(Number(postId) <= 100) {
          return state.postsState.posts.find(item => item.id === Number(postId))
      } else {
          return state.postsState.myPosts.find(item => item.id === Number(postId))
      }
    })

    const formik = useFormik({
        initialValues: {
            title: post ? post.title : '',
            body: post ? post.body : '',
            userId: post ? post.userId : 100,
        },
        validate: (values) => {
            const errors: NewPostFormikErrorType = {};

            if (!values.title) {
                errors.title = 'Title is required';
            }

            if (values.body.length >= 400) {
                errors.body = 'Your post have to include less then 200 symbols';
            }

            if (!values.body.trim()) {
                errors.body = 'Please enter your post';
            }

            if (!Number(values.userId)) {
                errors.userId = 'UserId should be a number'
            }

            return errors;
        },
        onSubmit: values => {
            if(postId) {
                dispatch(updatePost({
                    ...values,
                    id: Number(postId)
                }));
            } else {
                dispatch(createNewPost({
                    ...values,
                    userId: Number(values.userId),
                }));

            }

            dispatch(clearPostsState());
            navigate('/posts');
        },
    })

    const [userIdVisibility, setUserIdVisibility] = useState(true)

    const changeVisibility = useCallback(() => {
        setUserIdVisibility(!userIdVisibility)
    }, [userIdVisibility])

    return (
        <Container
            fixed
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Grid
                item
                justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <Paper
                        elevation={8}
                        className={styles.container}>
                        <CssBaseline/>
                        <Box className={styles.boxStyles}>
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <LocalPostOfficeIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {postId ? 'Edit post' : 'Add New Post'}
                            </Typography>
                            <TextField
                                color={'secondary'}
                                margin="normal"
                                required
                                fullWidth
                                autoComplete={'title'}
                                id="title"
                                label="Post title"
                                autoFocus
                                error={!!(formik.errors.title && formik.touched.title)}
                                {...formik.getFieldProps('title')}
                                helperText={formik.touched.title && formik.errors.title
                                    ? formik.errors.title : null}
                            />
                            <TextField
                                color={'secondary'}
                                margin="normal"
                                required
                                multiline
                                rows={5}
                                fullWidth
                                label="Post text"
                                id="body"
                                error={!!(formik.errors.body && formik.touched.body)}
                                helperText={formik.touched.body && formik.errors.body
                                    ? formik.errors.body : null}
                                {...formik.getFieldProps('body')}
                            />
                            <TextField
                                color={'secondary'}
                                margin="normal"
                                required
                                label="UserId"
                                type={userIdVisibility ? 'text' : 'password'}
                                id="userId"
                                error={!!(formik.errors.userId && formik.touched.userId)}
                                helperText={formik.touched.userId && formik.errors.userId
                                    ? formik.errors.userId : null}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={changeVisibility}
                                            edge="end">
                                            {userIdVisibility ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                                {...formik.getFieldProps('userId')}
                            />
                            <Button
                                type={'submit'}
                                fullWidth
                                variant={'contained'}
                                color={'secondary'}
                                sx={{mt: 3, mb: 2}}
                                disabled={!!(formik.errors.body || formik.errors.title || formik.errors.userId)}
                            >
                                {postId ? 'Edit post' : 'Add post'}
                            </Button>
                        </Box>
                    </Paper>
                </form>
            </Grid>
        </Container>
    );
})

