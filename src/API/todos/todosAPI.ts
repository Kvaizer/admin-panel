import {instance} from '../instace';
import {TodoType} from './todosTypes';

export const todosAPI = {
    getTodos(userId: number) {
        return instance.get<TodoType[]>(`users/${userId}/todos`);
    },

    deleteTodo(userId: number, todoId: number) {
        return instance.delete(`users/${userId}/todos/${todoId}`);
    },

    changeTodoStatus(userId: number, todoId: number, updatedTodo: TodoType) {
        return instance.post(`users/${userId}/todos/${todoId}`, updatedTodo)
    }
}