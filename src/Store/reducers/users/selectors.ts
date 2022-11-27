import {AppRootStateType} from '../../store';
import {UserType} from '../../../API/users/usersTypes';

export const selectUserFromTodosState = (state: AppRootStateType) => state.todosState.userId;

export const selectUserById = (state: AppRootStateType, params: {userId: number}) => state.usersState.users[params.userId] ? state.usersState.users[params.userId] : {} as UserType