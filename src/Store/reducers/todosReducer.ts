import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {InitialTodosStateType, TodoType} from '../../API/todos/todosTypes';
import {StatusType} from '../../API/commonTypes';
import {todosAPI} from '../../API/todos/todosAPI';

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
        } catch (e: any) {
            dispatch(setTodosStatus({status: StatusType.Failed}));

            return rejectWithValue({error: e.message});
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
        } catch (e: any) {
            dispatch(setTodosStatus({status: StatusType.Failed}));

            return rejectWithValue({error: e.message, todoId});
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
        } catch(e: any) {
            dispatch(setTodosStatus({status: StatusType.Failed}));

            return rejectWithValue({error: e.message, updatedTodo});
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
                    console.log(id)
                    if(id) {
                        state.todos[id] = payload.updatedTodo;
                    }
                }
            })

    }
})

export const todosReducer = slice.reducer