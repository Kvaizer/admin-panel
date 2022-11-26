import {StatusType} from '../commonTypes';

export type AlbumType = {
    userId: number,
    id: number,
    title: string,
    photos: Array<PhotoType>,
    start?: number
}

export type PhotoType = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export type AlbumsInitialStateType = {
    albums: Array<AlbumType>
    photos: {
        [albumId: number]: {
            photosEntries: Array<PhotoType>
            totalCount: number
            start: number
        }
    }
    status: StatusType
    offset: number
    totalCount: number
    error: string
    photosStart: number
    albumsStart: number
}

export type AlbumComponentPropsType = {
    album: AlbumType
}