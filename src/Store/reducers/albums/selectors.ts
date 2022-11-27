import {AppRootStateType} from '../../store';

export const selectAlbums = (state: AppRootStateType) => state.albumsState.albums;

export const selectTotalCountOfAlbums = (state: AppRootStateType) => state.albumsState.totalCount;

export const selectAlbumsOffset = (state: AppRootStateType) => state.albumsState.offset;

export const selectAlbumsStart = (state: AppRootStateType) => state.albumsState.albumsStart;

export const selectPhotos = (state: AppRootStateType, params: {albumId: number}) => state.albumsState.photos[params.albumId].photosEntries;

export const selectTotalCountOfPhotosInAlbum = (state: AppRootStateType, params: {albumId: number}) => state.albumsState.photos[params.albumId].totalCount;

export const selectAlbumStart = (state: AppRootStateType, params: {albumId: number}) => state.albumsState.photos[params.albumId].start

export const selectAlbumsStatus = (state: AppRootStateType) => state.albumsState.status

