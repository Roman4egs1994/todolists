import axios from "axios";

/** НАСТРОЙКИ API */
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '60a736fa-51da-4c8e-9364-ebbbd514420d'
    }
})


/** API */
export const todolistApi = {
    /** Todolist */
    getTodolist() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    },


    /** Task */
    getTask(todolistId: string) {
        return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }

}

/** ТИПИЗАЦИЯ TODOLIST и TASKS */
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponseType<T = {}> = {
    data: T
    message: string[]
    fieldsErrors: string[]
    resultCode: number
}
export enum TaskStatuses {
    New, //IsDone = false
    InProgress,
    Completed, //IsDone = true
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses //IsDone
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}
/** Для обновления Task (title и isDone) */
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string

}
type GetTaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}