import axios from "axios";

/** НАСТРОЙКИ API */
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers: {
        'API-KEY': '60a736fa-51da-4c8e-9364-ebbbd514420d'
    }
})



/** API */
export const todolistApi = {
    getTodolist(){
       return  instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist(title:string){
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`,{title})
    },
    deleteTodolist(todolistId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId:string,title:string){
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`,{title})
    },


    getTask(todolistId:string){
        return instance.get<TaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string, title:string){
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTask(todolistId:string,taskId:string){
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string,taskId:string,title:string){
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/{todolistId}/tasks/{taskId}`,{title})
    }

}

/** ТИПИЗАЦИЯ TODOLIST и TASKS */
type TodolistType = {
    id: string
    title:string
    addedDate: string
    order: number
}

type ResponseType<T = {}> = {
    data: T
    message: string[]
    fieldsErrors: string[]
    resultCode: number
}


type TaskType = {
    id: string
    title: string
    description: string
    todolistId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline:string
    addedDate: string
}

type TaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}