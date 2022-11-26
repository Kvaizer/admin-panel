import axios from 'axios';

const settings = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}

export const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    ...settings
})