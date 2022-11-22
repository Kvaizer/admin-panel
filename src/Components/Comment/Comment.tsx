import React from 'react';
import {Grid} from '@mui/material';
import {CommentPropsType} from '../../API/posts/commentsTypes';
import styles from './Comment.module.sass'

const Comment: React.FC<CommentPropsType> = ({comment}) => {
    return (
        <Grid container direction={'column'} className={styles.container}>
            <div className={styles.header}>
                <div className={styles.email}>{comment.email}</div>
                <div className={styles.name}>{comment.name}</div>
            </div>
            <div className={styles.body}>{comment. body}</div>
            <hr className={styles.line}/>
        </Grid>
    );
};

export default Comment;