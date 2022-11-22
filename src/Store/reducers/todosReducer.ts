import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

export const slice = createSlice({
    name: 'todos',
    initialState,
    reducers: {

    }
})

export const todosReducer = slice.reducer