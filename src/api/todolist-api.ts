import axios, {AxiosResponse} from "axios";


/** НАСТРОЙКИ API */
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '60a736fa-51da-4c8e-9364-ebbbd514420d'
    }
})


/** API */
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<any, AxiosResponse<ResponseType<{userId: number}>>, LoginParamsType>('/auth/login', data)
    },
    me(){
        return instance.get<ResponseType<{data:{id:string,email:string,login:string}}>>('/auth/me')
    },
    logout(){
        return instance.delete<ResponseType>('/auth/login')
    }
}


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
export type ResponseType<T = {}> = {
    data: T
    messages: string[]
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

export enum ResultCode {
    Ok = 0,
    Error = 1,
    Captcha = 10
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