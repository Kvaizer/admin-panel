import React, {DragEvent, useCallback} from 'react';
import {TodoListPropsType} from '../../../API/todos/todosTypes';
import {Paper} from '@mui/material';
import {Todo} from './Todo/Todo';
import Grid from '@mui/material/Grid';
import styles from './TodoList.module.sass'

export const TodoList: React.FC<TodoListPropsType> = React.memo(({todos, title, handleDragging, handleUpdateList, isDragging}) => {
    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => e.preventDefault(), [])

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleUpdateList(+e.dataTransfer.getData('todo'), title === 'Completed');
        handleDragging(false);
    }, [title, handleDragging])

    return (
            <Grid
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                item
                xs={6}
                md={4}>
                <Paper
                    sx={{
                        backgroundColor: isDragging ? 'rgba(0, 0, 0, 0.01)' : ''
                    }}
                    style={{padding: '10px', position: 'relative'}}
                    elevation={8}>
                    <h2 style={{textAlign: 'center'}}>
                        {title}
                    </h2>
                    <div className={styles.todosContainer}>
                        {todos.map(t => <Todo key={t.id} todo={t} handleDragging={handleDragging}/>)}
                        {!todos.length && <div style={{padding: '10px', color: 'grey'}}>No tasks</div>}
                    </div>
                </Paper>
            </Grid>
    );
})

