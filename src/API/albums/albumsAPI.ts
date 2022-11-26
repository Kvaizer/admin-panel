import {instance} from '../instace';
import {QueryPaginationParams} from '../commonTypes';
import {AlbumType, PhotoType} from './albumsTypes';
import axios from 'axios';

export const albumsAPI = {
    getAlbums({start, end}: QueryPaginationParams) {
        return instance.get<Array<AlbumType>>(`albums?_start=${start}&_end=${end}`);
    },

    deleteAlbum(albumId: number) {
        return instance.delete(`albums/${albumId}`)
    },

    getPhotos({start, end}: QueryPaginationParams, albumId: number) {
        return instance.get<Array<PhotoType>>(`albums/${albumId}/photos?_start=${start}&_end=${end}`);
    },

    uploadImage(file64: string) {
        return axios.post<any>('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                Authorization: `Client-ID `
            },
            body: {image: file64},
            referrer: '',
        });
    },
}


