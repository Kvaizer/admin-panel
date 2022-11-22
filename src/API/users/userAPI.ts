import {UserType} from './usersTypes';
import {instance} from '../instace';

export const userAPI = {
    getUser(userId: number) {
        return instance.get<UserType>(`users/${userId}`)
    }
}