import React, {createContext, useCallback, useEffect, useMemo, useState} from 'react';
import {Arrows} from './Arrows/Arrows';
import styles from './Slider.module.sass'
import {Dots} from './Dots/Dots';
import {SlidesList} from './SlidesList/SlidesList';
import './Slider.module.sass'
import {cleanAlbum, fetchPhotosByAlbumId, setPhotosStart} from '../../../Store/reducers/albums/albumsReducer';
import {useAppDispatch, useAppSelector} from '../../../utils/hooks';
import {
    selectAlbumsOffset, selectAlbumStart,
    selectPhotos,
    selectTotalCountOfPhotosInAlbum
} from '../../../Store/reducers/albums/selectors';

type SliderPropsType = {
    width: string
    height: string
    autoPlay: boolean
    autoPlayTime: number,
    albumId: number,
    size: 0 | 1;
}

type SliderContextState = {
    goToSlide: (number: number) => void,
    changeSlide: (direction: number) => void,
    slidesCount: number,
    slideNumber: number,
    items: {url: string, title: string}[]
    isFetching: boolean
    size: 0 | 1
}

export const SliderContext = createContext({} as SliderContextState);

export const Slider: React.FC<SliderPropsType> = ({
                                                      width,
                                                      height,
                                                      autoPlay,
                                                      autoPlayTime,
                                                      albumId,
                                                      size
                                                  } = {
    width: '100%',
    height: '100%',
    autoPlay: false,
    autoPlayTime: 10000,
    albumId: -1,
    size: 0
}) => {
    const dispatch = useAppDispatch();

    const photos = useAppSelector(state => selectPhotos(state, {albumId}));
    const totalCount = useAppSelector(state => selectTotalCountOfPhotosInAlbum(state, {albumId}));
    const offset = useAppSelector(selectAlbumsOffset);
    const startFromState = useAppSelector(state => selectAlbumStart(state, {albumId}));

    const items = useMemo(() => {
        return photos.map(photo => {
            if(size) return  {url: photo.url, title: photo.title, id: photo.id}
            return {url: photo.thumbnailUrl, title: photo.title, id: photo.id}
        })
    }, [photos, size])

    const [slide, setSlide] = useState(0);
    const [isFetching, setIsFetching] = useState(true);
    const [start, setStart] = useState(startFromState);

    useEffect(() => {
        if(isFetching) {
            if(totalCount !== items.length) {
                setSlide(items.length)
            }

            dispatch(fetchPhotosByAlbumId({params: {start: start, end: start + offset}, albumId}));
            setStart(start + offset);
            setIsFetching(false);
        }
    }, [isFetching]);

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            changeSlide(1);
        }, autoPlayTime);

        return () => {
            clearInterval(interval);
        };
    }, [items.length, slide])



    const changeSlide = useCallback((direction = 1) => {
        let slideNumber = 0;

        if (slide + direction < 0) {
            slideNumber = items.length - 1;
        } else if(slide + direction === items.length) {
            setIsFetching(true);
        } else {
            slideNumber = (slide + direction) % items.length;
        }

        setSlide(slideNumber);
    }, [slide, items])

    const goToSlide = useCallback((number: number) => {
        setSlide(number % items.length);
    }, [items])

    return (
        <div
            style={{width, height}}
            className={styles.slider}
        >
            <SliderContext.Provider value={{
                changeSlide,
                goToSlide,
                slidesCount: items.length,
                slideNumber: slide,
                items,
                isFetching,
                size,
            }}>
                <Arrows/>
                <SlidesList/>
                <Dots/>
            </SliderContext.Provider>
        </div>
    );
}

