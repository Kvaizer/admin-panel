import {StatusType} from '../commonTypes';

export type TodoType = {
    id: number
    title: string
    completed: boolean
}

export type InitialTodosStateType = {
    todos: Array<TodoType>
    myTodos: Array<TodoType>
    status: StatusType
    error: string
    userId: number
}

export type SortedTodosType = {
    completed: Array<TodoType>
    inProgress: Array<TodoType>
}

export type TodoListPropsType = {
    todos: Array<TodoType>
    title: string
    isDragging: boolean
    handleDragging: (isDragging: boolean) => void
    handleUpdateList: (id: number, status: boolean) => void
}

export type TodoPropsTypes = {
    todo: TodoType
    handleDragging: (isDragging: boolean) => void
}