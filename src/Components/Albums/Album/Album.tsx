import React, {ChangeEvent, useCallback} from 'react';
import {AlbumComponentPropsType} from '../../../API/albums/albumsTypes';
import {Button, Grid, IconButton} from '@mui/material';
import {Slider} from '../../features/Slider/Slider';
import styles from './Album.module.sass';
import {NavLink} from 'react-router-dom';
import {clearPhotos, deleteAlbum, uploadPhoto} from '../../../Store/reducers/albumsReducer';
import {useAppDispatch} from '../../../utils/hooks';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {StatusType} from '../../../API/commonTypes';
import {convertFileToBase64} from '../../../utils/common';
import {ModalWindow} from '../../features/Modal/Modal';

export const Album: React.FC<AlbumComponentPropsType> = React.memo(({album}) => {
    const dispatch = useAppDispatch();

    const onDeleteButtonClickHandler = () => {
        dispatch(deleteAlbum(album.id))
    }

    const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 1000000) {
                convertFileToBase64(file, (file64) => {
                    dispatch(uploadPhoto({image: file64, albumId: album.id}))
                })
            }
        } else {
            dispatch(setAlbumsStatus(StatusType.Failed))
        }
    }

    const onTitleClickHandler = useCallback(() => {
        dispatch(clearPhotos())
    }, []);

    return <Grid
        sx={{
            width: '100%',
            margin: '10px'
        }}
        item
        xs={6}>
        <div>
            <NavLink to={`${album.id}`}>
                <div className={styles.title} onClick={onTitleClickHandler}>{album.title}</div>
            </NavLink>
            <div className={styles.buttonContainer}>
                <ModalWindow title={'delete'}
                             description={'Do yo really want to remove this post?'}
                             children={
                                 <Button
                                     key={album.id}
                                     onClick={onDeleteButtonClickHandler}
                                     style={{borderRadius: '30px'}}
                                     sx={{mt: 3, mb: 2}}
                                     variant={'contained'}
                                     color={'error'}
                                     size={'small'}
                                 >Delete</Button>
                             }/>
                <label className={styles.uploadPhoto}>
                    <input type="file"
                           accept={'image'}
                           onChange={uploadHandler}
                           style={{display: 'none'}}
                    />
                    <IconButton component="span">
                        <AddAPhotoIcon/>
                    </IconButton>
                </label>
            </div>
        </div>
        <hr className={styles.line}/>
        <Slider
            width={'100%'}
            height={'100%'}
            autoPlay={false}
            autoPlayTime={5000}
            albumId={album.id}
            size={0}/>
    </Grid>
});

function setAlbumsStatus(Failed: StatusType): any {
    throw new Error('Function not implemented.');
}

