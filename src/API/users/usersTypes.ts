import {StatusType} from '../commonTypes';
import {isNumber} from 'util';

type AddressType = {
    "street": string,
    "suite": string,
    "city": string,
    "zipcode": string,
    "geo": {
        "lat": string,
        "lng": string
    }
}

export type UserType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: AddressType,
    phone: string,
    website: string,
    avatar: string
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

export type UsersInitialStateType = {
    users: {
        [id: number]: UserType
    },
    status: StatusType,
    error: string
}

export type UserPropsType = {
    userId: number
}

export type PopUpUserPropsType = {
    user: UserType
    avatar: string
}
