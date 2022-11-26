import React, {ChangeEvent, useCallback} from 'react';
import {TodoPropsTypes} from '../../../../API/todos/todosTypes';
import {Checkbox} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../../utils/hooks';
import IconButton from '@mui/material/IconButton';
import {Delete} from '@mui/icons-material';
import EditableSpan from '../../../features/EditableSpan/EditableSpan';
import {deleteTodo, updateTodo} from '../../../../Store/reducers/todosReducer';

export const Todo: React.FC<TodoPropsTypes> = React.memo(({todo, handleDragging}) => {
    const dispatch = useAppDispatch();

    const userId = useAppSelector(state => state.todosState.userId)

    const onCheckboxChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTodo({userId, updatedTodo: {
                ...todo,
                completed: e.currentTarget.checked
            }}))
    }, [userId])

    const onDeleteClickHandler = useCallback(() => {
        dispatch(deleteTodo({userId, todoId: todo.id}))
    }, [todo, userId])

    const onTitleChangeHandler = useCallback((newTitle: string) => {
        dispatch(updateTodo({userId, updatedTodo: {
                ...todo,
                title: newTitle
            }}))
    }, [todo, userId])

    const handleDragEnd = () => handleDragging(false)

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        console.log(e.dataTransfer)
        e.dataTransfer.setData('todo', `${todo.id}`)
        handleDragging(true)
    }

    return (
        <div key={todo.id}
             draggable
             onDragEnd={handleDragEnd}
             onDragStart={handleDragStart}
             style={{position: 'relative'}}>
            <Checkbox
                checked={todo.completed}
                color="primary"
                onChange={onCheckboxChangeHandler}
            />

            <EditableSpan value={todo.title} onChange={onTitleChangeHandler}/>
            <IconButton size={'small'} onClick={onDeleteClickHandler} style={{ position: 'absolute', top: '2px', right: '2px'} }>
                <Delete fontSize={'small'}/>
            </IconButton>
        </div>
    );
})

