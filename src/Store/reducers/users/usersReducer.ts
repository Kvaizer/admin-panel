import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {UsersInitialStateType, UserType} from '../../../API/users/usersTypes';
import {StatusType} from '../../../API/commonTypes';
import {userAPI} from '../../../API/users/userAPI';
import {imagePicker} from '../../../utils/common';
import {AppRootStateType} from '../../store';
import {AxiosError} from 'axios';
import {setAppError} from '../appReducer';

const initialState: UsersInitialStateType = {
    users: {
        100: {
            id: 100,
            name: 'Artem Sarkisyantc',
            username: 'Kvaizer',
            email: 'kvaizer99@gmail.com',
            address: {
                street: 'Green',
                "suite": 'any',
                "city": 'Jakarta',
                "zipcode": '007',
                "geo": {
                    "lat": 'any',
                    "lng": 'eng'
                }
            },
            phone: '8800553535',
            website: 'google.com',
            avatar: imagePicker(),
            company: {
                name: 'Google',
                catchPhrase: 'NbIAAAAA',
                bs: 'any'
            }
        }
    },
    status: StatusType.Idle,
    error: ''
}

export const setUsersStatus = createAction<{status: StatusType}>('users/setUsersStatus')

export const fetchUserById = createAsyncThunk<{ userId: number, user: UserType }, number, { rejectValue: { error: string } }>('users/fetchUser',
    async (userId, {dispatch, rejectWithValue, getState}) => {
        dispatch(setUsersStatus({status: StatusType.InProgress}));
        const state = getState() as AppRootStateType

        if (state.usersState.users[userId]) {
            return rejectWithValue({error: 'User already exist'});
        }

        try {
            const res = await userAPI.getUser(userId);
            const user = res.data;
            dispatch(setUsersStatus({status: StatusType.Succeeded}));

            return {user, userId}
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>;
            dispatch(setUsersStatus({status: StatusType.Failed}));
            dispatch(setAppError({error: err.message}));

            return rejectWithValue({error: err.message});
        }
    })

export const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.status = StatusType.InProgress;
            })

            .addCase(fetchUserById.fulfilled, (state, {payload}) => {
                state.users[payload.userId] = payload.user;
                state.users[payload.userId].avatar = imagePicker();
            })

            .addCase(fetchUserById.rejected, (state, {payload}) => {
                state.error = payload?.error ? payload.error : 'Some error occurred';
            })
    }
})

export const usersReducer = slice.reducer;