import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {
    cleanAlbum,
    cleanAlbumsState,
    cleanPhotosEntries,
    fetchAlbums,
    setAlbumsStart
} from '../../Store/reducers/albums/albumsReducer';
import {Grid} from '@mui/material';
import Container from '@mui/material/Container';
import {Album} from './Album/Album';
import {
    selectAlbums,
    selectAlbumsOffset,
    selectAlbumsStart, selectAlbumsStatus,
    selectTotalCountOfAlbums
} from '../../Store/reducers/albums/selectors';
import {StatusType} from '../../API/commonTypes';
import LinearProgress from '@mui/material/LinearProgress';

export const Albums: React.FC = () => {
    const dispatch = useAppDispatch()

    const block = useRef(null);

    const albums = useAppSelector(selectAlbums);
    const totalCount = useAppSelector(selectTotalCountOfAlbums);
    const offset = useAppSelector(selectAlbumsOffset);
    const startFromState = useAppSelector(selectAlbumsStart);
    const status = useAppSelector(selectAlbumsStatus)

    const [start, setStart] = useState(startFromState);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fn = async () => {
            if (isFetching) {

                try {
                    await dispatch(fetchAlbums({start: start, end: start + offset}));
                    setStart(start + offset);
                    dispatch(setAlbumsStart());
                    setIsFetching(false);
                } catch (e: any) {
                    throw new Error(e.message)
                }
            }
        }

        fn();
    }, [isFetching])

    useEffect(() => {
        document.addEventListener('scroll', infiniteScrollHandler)

        return () => {
            document.removeEventListener('scroll', infiniteScrollHandler)
        }
    }, [totalCount])

    useEffect(() => {
        return () => {
            dispatch(cleanPhotosEntries());
            dispatch(cleanAlbumsState());
        }
    }, [])

    const infiniteScrollHandler = useCallback(() => {
        if (!block.current) return;

        const windowHeight = window.innerHeight;
        const {offsetHeight} = block.current;
        const yOffset = window.scrollY;

        const y = yOffset + windowHeight;

        if (y >= offsetHeight - 100 && albums.length <= totalCount) {
            setIsFetching(true)
        }
    }, [isFetching])

    return (
        <div onScroll={infiniteScrollHandler} ref={block}>
            {status === StatusType.InProgress ? <LinearProgress /> : null}
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                fixed>
                <Grid
                    container
                    sx={{
                        width: '90%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '10px',
                    }}
                    rowSpacing={4}
                    direction={'column'}>
                    {albums.map((album) => <Album key={album.id} album={album}/>)}
                </Grid>
            </Container>
        </div>
    );
}

