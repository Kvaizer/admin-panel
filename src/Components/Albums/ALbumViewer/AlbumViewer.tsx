import React, {useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Slider} from '../../features/Slider/Slider';
import styles from './AlbumViewer.module.sass'
import IconButton from '@mui/material/IconButton';
import ReplyIcon from '@mui/icons-material/Reply';
import {useAppDispatch} from '../../../utils/hooks';
import {clearPhotos} from '../../../Store/reducers/albums/albumsReducer';

export const AlbumViewer: React.FC = () => {
    const {albumId} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const onBackButtonClickHandler = useCallback(() => {
        dispatch(clearPhotos());
        navigate('/albums');
    }, []);

    return (
        <div className={styles.container}>
            <IconButton onClick={onBackButtonClickHandler}>
                <ReplyIcon/>
            </IconButton>
            <Slider
                width={'100%'}
                height={'100%'}
                autoPlay={false}
                autoPlayTime={5000}
                albumId={Number(albumId)}
                size={1}/>
        </div>
    );
};

