import {AppRootStateType} from '../../store';

export const selectTodos = (state: AppRootStateType) => state.todosState.todos;

export const selectTodosStatus = (state: AppRootStateType) => state.todosState.status;



