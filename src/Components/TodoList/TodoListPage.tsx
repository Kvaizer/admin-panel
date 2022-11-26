import React, {useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {SortedTodosType} from '../../API/todos/todosTypes';
import {TodoList} from './TodoList/TodoList';
import {fetchTodos, updateTodo} from '../../Store/reducers/todosReducer';
import {Grid, LinearProgress} from '@mui/material';
import {StatusType} from '../../API/commonTypes';

export const TodoListPage = () => {
    const dispatch = useAppDispatch();

    const todos = useAppSelector(state => state.todosState.todos);
    const status = useAppSelector(state => state.todosState.status);

    useEffect(() => {
        dispatch(fetchTodos(1));
    }, [])

    const sortedTodos = useMemo(() => {
        console.log(todos)
        return todos.reduce((acc: SortedTodosType, todo) => {
            if (todo.completed) {
                acc.completed.push(todo);
            } else {
                acc.inProgress.push(todo);
            }
            return acc
        }, {
            completed: [],
            inProgress: [],
        })
    }, [todos])

    const [isDragging, setIsDragging] = useState(false);
    const handleDragging = (dragging: boolean) => setIsDragging(dragging);

    const handleUpdateList = (id: number, status: boolean) => {
        const todo = todos.find(item => item.id === id)

        if (todo && todo.completed !== status) {
            dispatch(updateTodo({
                userId: 1, updatedTodo: {
                    ...todo,
                    completed: !todo.completed
                }
            }))
        }
    }
    console.log(status)
    return (
        <>
            {status === StatusType.InProgress ? <LinearProgress/> : null}
            <Grid
                container
                direction={'row'}
                spacing={4}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}>
                <TodoList
                    todos={sortedTodos.completed}
                    title={'Completed'}
                    isDragging={isDragging}
                    handleUpdateList={handleUpdateList}
                    handleDragging={handleDragging}/>
                <TodoList
                    todos={sortedTodos.inProgress}
                    title={'inProgress'}
                    isDragging={isDragging}
                    handleUpdateList={handleUpdateList}
                    handleDragging={handleDragging}/>
            </Grid>
        </>
    );
};

