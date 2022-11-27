import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {InitialTodosStateType, TodoType} from '../../../API/todos/todosTypes';
import {StatusType} from '../../../API/commonTypes';
import {todosAPI} from '../../../API/todos/todosAPI';
import {AxiosError} from 'axios';
import {setAppError} from '../appReducer';

const initialState: InitialTodosStateType = {
    todos: [],
    myTodos: [],
    userId: 1,
    status: StatusType.Idle,
    error: ''
};

export const setTodosStatus = createAction<{ status: StatusType }>('todos/setTodosStatus');

export const fetchTodos = createAsyncThunk<{ todos: TodoType[] }, number, { rejectValue: { error: string } }>('todos/fetchTodos',
    async (userId, {dispatch, rejectWithValue}) => {
        dispatch(setTodosStatus({status: StatusType.InProgress}));

        try {
            const res = await todosAPI.getTodos(userId);
            dispatch(setTodosStatus({status: StatusType.Succeeded}));

            return {todos: res.data};
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>;
            dispatch(setTodosStatus({status: StatusType.Failed}));
            dispatch(setAppError({error: err.message}));

            return rejectWithValue({error: err.message});
        }
    }
)

export const deleteTodo = createAsyncThunk<{ todoId: number }, { userId: number, todoId: number }, { rejectValue: { error: string, todoId: number } }>('todos/deleteTodo',
    async ({userId, todoId}, {dispatch, rejectWithValue}) => {
        dispatch(setTodosStatus({status: StatusType.InProgress}));

        try {
            await todosAPI.deleteTodo(userId, todoId);
            dispatch(setTodosStatus({status: StatusType.Succeeded}));

            return {todoId};
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>;
            dispatch(setTodosStatus({status: StatusType.Failed}));

            return rejectWithValue({error: err.message, todoId});
        }
    }
)

export const updateTodo = createAsyncThunk<{updatedTodo: TodoType}, { userId: number, updatedTodo: TodoType }, { rejectValue: { error: string, updatedTodo: TodoType } }>(
    'todos/updateTodo', async ({userId, updatedTodo}, {dispatch, rejectWithValue}) => {
        dispatch(setTodosStatus({status: StatusType.InProgress}));

        try {
            await todosAPI.changeTodoStatus(userId, updatedTodo.id, updatedTodo)
            dispatch(setTodosStatus({status: StatusType.Succeeded}));

            return {updatedTodo};
        } catch(e) {
            const err = e as Error | AxiosError<{ error: string }>;
            dispatch(setTodosStatus({status: StatusType.Failed}));

            return rejectWithValue({error: err.message, updatedTodo});
        }
    }
)

export const slice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setTodosStatus, (state, {payload}) => {
                state.status = payload.status;
            })

            .addCase(fetchTodos.fulfilled, (state, {payload}) => {
                state.todos = payload.todos;
            })

            .addCase(fetchTodos.rejected, (state, {payload}) => {
                state.error = payload?.error ? payload.error : 'Some error occurred';
            })

            .addCase(deleteTodo.rejected, (state, {payload}) => {
                if (payload) state.todos = state.todos.filter(t => t.id !== payload.todoId);
            })

            .addCase(updateTodo.rejected, (state, {payload}) => {
                if(payload) {
                    const id = state.todos.findIndex(item => item.id === payload.updatedTodo.id);

                    if(id) {
                        state.todos[id] = payload.updatedTodo;
                    }
                }
            })

    }
})

export const todosReducer = slice.reducer