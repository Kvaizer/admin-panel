import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AlbumsInitialStateType, AlbumType, PhotoType} from '../../../API/albums/albumsTypes';
import {QueryPaginationParams, StatusType} from '../../../API/commonTypes';
import {albumsAPI} from '../../../API/albums/albumsAPI';
import {AxiosError} from 'axios';
import {setAppError} from '../appReducer';

const initialState: AlbumsInitialStateType = {
    albums: [],
    photos: {},
    status: StatusType.Idle,
    offset: 5,
    totalCount: 0,
    error: '',
    photosStart: 0,
    albumsStart: 0,
};

export const cleanAlbum = createAction<{ albumId: number }>('albums/cleanAlbum');
export const setAlbumsStatus = createAction<{ status: StatusType }>('albums/setAlbumsStatus');
export const setPhotosStart = createAction('albums/setPhotosStart');
export const setAlbumsStart = createAction('albums/setAlbumsStart');
export const setAlbumStart = createAction<{albumId: number, start: number}>('albums/setAlbumStart');
export const clearPhotos = createAction('albums/clearPhotos');
export const cleanPhotosEntries = createAction('albums/cleanPhotosEntries');
export const cleanAlbumsState = createAction('albums/cleanAlbumsState');

export const fetchAlbums = createAsyncThunk<{ albums: Array<AlbumType>, totalCount?: string }, QueryPaginationParams, { rejectValue: { error: string } }>('albums/fetchAlbums',
    async (params, {dispatch, rejectWithValue}) => {
        dispatch(setAlbumsStatus({status: StatusType.InProgress}))

        try {
            const res = await albumsAPI.getAlbums(params);
            const albums = res.data;
            const totalCount = res.headers['x-total-count'];

            dispatch(setAlbumsStatus({status: StatusType.Succeeded}));

            return {albums, totalCount};
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>;
            dispatch(setAlbumsStatus({status: StatusType.Failed}));

            return rejectWithValue({error: err.message});
        }
    }
);

export const fetchPhotosByAlbumId = createAsyncThunk<{ photos: Array<PhotoType>, albumId: number, totalCount?: string }, { params: QueryPaginationParams, albumId: number }, { rejectValue: { error: string } }>('albums/fetchPhotosByAlbumId', async ({params, albumId}, {dispatch, rejectWithValue}) => {
    dispatch(setAlbumsStatus({status: StatusType.InProgress}));

    try {
        const res = await albumsAPI.getPhotos(params, albumId);
        const photos = res.data;
        const totalCount = res.headers['x-total-count'];

        dispatch(setAlbumsStatus({status: StatusType.Succeeded}));

        return {photos, albumId, totalCount}
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;
        dispatch(setAlbumsStatus({status: StatusType.Failed}));
        dispatch(setAppError({error: err.message}));

        return rejectWithValue({error: err.message})
    }
})

export const uploadPhoto = createAsyncThunk<{ imageUrl: string }, { image: string, albumId: number }, { rejectValue: { error: string, image: string, albumId: number } }>('album/uploadImage',
    async ({image, albumId}, {dispatch, rejectWithValue}) => {
        dispatch(setAlbumsStatus({status: StatusType.InProgress}));
        try {
            const res = await albumsAPI.uploadImage(image);
            dispatch(setAlbumsStatus({status: StatusType.Succeeded}));

            return {imageUrl: res.data.data.link};
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            dispatch(setAlbumsStatus({status: StatusType.Succeeded}));

            return rejectWithValue({error: err.message, image, albumId});
        }
    }
)

export const deleteAlbum = createAsyncThunk<{ albumId: number }, number, { rejectValue: { error: string } }>('albums/deleteAlbum',
    async (albumId, {dispatch, rejectWithValue}) => {
        dispatch(setAlbumsStatus({status: StatusType.InProgress}));

        try {
            await albumsAPI.deleteAlbum(albumId);
            dispatch(setAlbumsStatus({status: StatusType.Succeeded}));


            return {albumId}
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            dispatch(setAlbumsStatus({status: StatusType.Failed}));
            dispatch(setAppError({error: err.message}));

            return rejectWithValue({error: err.message});
        }
    }
)

export const slice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: ((builder) => {
        builder
            .addCase(setAlbumsStatus, (state, {payload}) => {
                state.status = payload.status;
            })

            .addCase(fetchAlbums.fulfilled, (state, {payload}) => {
                state.albums = state.albums.concat(payload.albums);
                payload.albums.forEach(album => state.photos[album.id] = {photosEntries: [], totalCount: 0, start: 0});
                state.totalCount = Number(payload.totalCount);
            })

            .addCase(fetchAlbums.rejected, (state, {payload}) => {
                state.error = payload?.error ? payload.error : 'Some error occurred';
            })

            .addCase(fetchPhotosByAlbumId.fulfilled, (state, {payload}) => {
                state.photos[payload.albumId] = {
                    photosEntries: state.photos[payload.albumId].photosEntries.concat(payload.photos),
                    totalCount: Number(payload.totalCount),
                    start: payload.photos.length - 1
                }
            })

            .addCase(fetchPhotosByAlbumId.rejected, (state, {payload}) => {
                state.error = payload?.error ? payload.error : 'Some error occurred';
            })

            .addCase(deleteAlbum.fulfilled, (state, {payload}) => {
                const albumId = state.albums.find(album => album.id === payload.albumId)?.id;
                if (albumId) {
                    state.albums = state.albums.filter(item => item.id !== albumId);
                    delete state.photos[albumId];
                }
            })

            .addCase(uploadPhoto.rejected, (state, {payload}) => {
                // На сервер картинку загрузить не возможно, а imgur блочит запросы с localhost, поэтому так
                if (payload?.albumId && payload.image) state.photos[payload?.albumId].photosEntries.unshift({
                    albumId: Math.floor(Math.random() * 1000 + 101),
                    id: Math.floor(Math.random() * 1000 + 101),
                    title: 'my',
                    url: payload.image,
                    thumbnailUrl: payload.image
                })
            })

            .addCase(cleanAlbum, (state, {payload}) => {
                state.photos[payload.albumId].photosEntries = [];
            })

            .addCase(setPhotosStart, (state) => {
                state.photosStart += state.offset
            })

            .addCase(setAlbumsStart, (state) => {
                state.albumsStart += state.offset
            })

            .addCase(setAlbumStart, (state, {payload}) => {
               const album = state.albums.find(item => item.id === payload.albumId);
               if(album) album.start = payload.start;
            })

            .addCase(cleanAlbumsState, (state) => {
                state.albums = [];
                state.albumsStart = 0;
            })

            .addCase(clearPhotos, (state) => {
                for(const key in state.photos) {
                    state.photos[Number(key)] = {
                        photosEntries: [],
                        totalCount: 0,
                        start: 0,
                    }
                }
            })

            .addCase(cleanPhotosEntries, (state) => {
                for(const key in state.photos) {
                    state.photos[key].photosEntries = [];
                    state.photos[key].totalCount = 0;
                    state.photos[key].start = 0;
                }
            })
    })
})

export const albumsReducer = slice.reducer