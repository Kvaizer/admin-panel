import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {UsersInitialStateType, UserType} from '../../API/users/usersTypes';
import {StatusType} from '../../API/commonTypes';
import {userAPI} from '../../API/users/userAPI';
import {imagePicker} from '../../utils/common';
import {AppRootStateType} from '../store';

const initialState: UsersInitialStateType = {
    users: {},
    status: StatusType.Idle,
    error: ''
}

export const fetchUserById = createAsyncThunk<{ userId: number, user: UserType }, number, { rejectValue: { error: string } }>('users/fetchUser',
    async (userId, {rejectWithValue, getState}) => {
        const state = getState() as AppRootStateType

        if (state.usersState.users[userId]) {
            console.log(state.usersState.users[userId])
            return rejectWithValue({error: 'User already exist'});
        }

        try {
            const res = await userAPI.getUser(userId);
            const user = res.data;
            return {user, userId}
        } catch (e: any) {
            return rejectWithValue({error: e.message})
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