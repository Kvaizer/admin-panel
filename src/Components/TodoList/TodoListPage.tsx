import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {SortedTodosType} from '../../API/todos/todosTypes';
import {TodoList} from './TodoList/TodoList';
import {fetchTodos, updateTodo} from '../../Store/reducers/todos/todosReducer';
import {Grid} from '@mui/material';
import {StatusType} from '../../API/commonTypes';
import {selectTodos, selectTodosStatus} from '../../Store/reducers/todos/selectors';
import LinearProgress from '@mui/material/LinearProgress';

export const TodoListPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const todos = useAppSelector(selectTodos);
    const status = useAppSelector(selectTodosStatus);
    console.log(status)
    useEffect(() => {
        dispatch(fetchTodos(1));
    }, []);

    const sortedTodos = useMemo(() => {
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

    const handleDragging = useCallback((isDragging: boolean) => setIsDragging(isDragging), [isDragging]);

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

    return (
        <div style={{width: '100%'}}>
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
        </div>
    );
};


