import {createAction, createSlice} from '@reduxjs/toolkit';
import {StatusType} from '../../API/commonTypes';

type AppInitialStatType = {
    error: string | null
    status: StatusType
}

const initialState: AppInitialStatType = {
    error: null,
    status: StatusType.Idle
};

export const setAppError = createAction<{error: string | null}>('app/setAppError')
export const setAppStatus = createAction<{status: StatusType}>('app/setAppStatus')


export const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(setAppError, (state, {payload}) => {
                state.error = payload.error;
            })

            .addCase(setAppStatus, (state, {payload}) => {
                state.status = payload.status
            })
    }
})

export const appReducer = slice.reducer