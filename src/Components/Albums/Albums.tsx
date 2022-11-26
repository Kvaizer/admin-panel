import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {fetchAlbums, setAlbumsStart} from '../../Store/reducers/albumsReducer';
import {Grid} from '@mui/material';
import {AlbumType} from '../../API/albums/albumsTypes';
import Container from '@mui/material/Container';
import {Album} from './Album/Album';

export const Albums: React.FC = React.memo(() => {
    const dispatch = useAppDispatch()

    const block = useRef(null);

    const albums = useAppSelector(state => state.albumsState.albums ? state.albumsState.albums : [] as Array<AlbumType>)
    const totalCount = useAppSelector(state => state.albumsState.totalCount);
    const offset = useAppSelector(state => state.albumsState.offset);
    const startFromState = useAppSelector(state => state.albumsState.albumsStart);

    const [start, setStart] = useState<number>(startFromState);
    const [isFetching, setIsFetching] = useState<boolean>(true);

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
});

