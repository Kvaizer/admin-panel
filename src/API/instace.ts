import axios from 'axios';

const settings = {

}

export const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    ...settings
})