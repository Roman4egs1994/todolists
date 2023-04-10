
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: TodolistDomainType[] = []

/** REDUCER всех действий связанных с Todolist*/
export const todolistReducer = (state = initialState, action: ActionTodolistType): TodolistDomainType[] => {
    switch (action.type) {
        case "GET-TODOLISTS": {
            return action.todolists.map((el) => ({...el, filter: "all"}))
        }
        case "REMOVE-TODOLIST": {
            return state.filter((todo) => todo.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            const newId = action.todolist.id
            const newTodo: TodolistDomainType = {
                id: newId,
                title: action.todolist.title,
                addedDate: action.todolist.addedDate,
                order: action.todolist.order,
                filter: 'all'
            }
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
    return {type: "REMOVE-TODOLIST", todolistId} as const
}

export const addTodolistAC = (todolist:TodolistType) => {
    return {type: "ADD-TODOLIST", todolist} as const
}

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", todolistId, newTitle} as const
}

export const changeFilterTodolistAC = (todolistId: string, value: FilteredTaskType) => {
    return {type: "CHANGE-FILTER", todolistId, value} as const
}

export const getTodolistsAC = (todolists: TodolistType[]) => {
    return {type: "GET-TODOLISTS", todolists} as const
}

/** ТИПИЗАЦИЯ ACTION CREATOR*/
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
type ChangeFilterACType = ReturnType<typeof changeFilterTodolistAC>
export type GetTodolistsACType = ReturnType<typeof getTodolistsAC>

/** ТИПИЗАЦИЯ РЕДЮСЕРА*/
type ActionTodolistType = RemoveTodolistType
    | AddTodolistACType
    | ChangeTodolistTitleAC
    | ChangeFilterACType
    | GetTodolistsACType


/** ТИПИЗАЦИЯ INITIALSTATE*/
export type FilteredTaskType = 'all' | 'active' | 'completed' //Типизация фильтрации тасок

/** Составная типизация*/
export type TodolistDomainType = TodolistType & {
    filter: FilteredTaskType
}


export const getTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todolistApi.getTodolist()
            .then((res) => {
                dispatch(getTodolistsAC(res.data))
            })
    }

}


export const deleteTodoListTC = (todolistId:string) => {
    return (dispatch:Dispatch) => {
        todolistApi.deleteTodolist(todolistId)
            .then((res)=> {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const addTodoListTC = (title:string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTodolist(title)
            .then((res)=>{
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const updateTitleTodolistTC = (todolistId:string,title:string) => {
    return (dispatch:Dispatch) => {
        todolistApi.updateTodolist(todolistId,title)
            .then((res)=> {
                dispatch(changeTodolistTitleAC(todolistId,title))
            })
    }
}