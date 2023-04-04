import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";



const initialState: TodolistDomainType[] = []

/** REDUCER всех действий связанных с Todolist*/
export const todolistReducer = (state = initialState, action: ActionTodolistType): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((todo) => todo.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            // const newId = v1()
            const newTodo: TodolistDomainType = {id: action.todolistId, title: action.title,addedDate:'',order:0, filter: 'all'}
            return [newTodo, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((todo) => todo.id === action.todolistId ? {...todo, title: action.newTitle} : todo)
        }
        case "CHANGE-FILTER": {
            return state.map((todo) => todo.id === action.todolistId
                ? {...todo, filter: action.value}
                : todo)
        }
        default: {
            return state
        }
    }
}


/** ACTION CREATOR*/
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId: v1() //Для формирования одинаковых Id в tasks и todolist
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todolistId,
        newTitle
    } as const
}

export const changeFilterTodolistAC = (todolistId: string, value: FilteredTaskType) => {
    return {
        type: "CHANGE-FILTER",
        todolistId,
        value
    } as const
}

/** ТИПИЗАЦИЯ ACTION CREATOR*/
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
type ChangeFilterACType = ReturnType<typeof changeFilterTodolistAC>

/** ТИПИЗАЦИЯ РЕДЮСЕРА*/
type ActionTodolistType = RemoveTodolistType
    | AddTodolistACType
    | ChangeTodolistTitleAC
    | ChangeFilterACType


/** ТИПИЗАЦИЯ INITIALSTATE*/
export type FilteredTaskType = 'all' | 'active' | 'completed'


/** Составная типизация*/
export type TodolistDomainType = TodolistType & {
    filter: FilteredTaskType
}