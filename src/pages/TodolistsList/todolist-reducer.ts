
import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";

const initialState: TodolistDomainType[] = []

/** REDUCER всех действий связанных с Todolist*/
export const todolistReducer = (state = initialState, action: ActionTodolistType): TodolistDomainType[] => {
    switch (action.type) {
        case "GET-TODOLISTS": {
            return action.todolists.map((el) => ({...el, filter: "all"}))
        }
        case "REMOVE-TODOLIST": {
            return state.filter((todo) => todo.id !== action.tId)
        }
        case "ADD-TODOLIST": {
            const newId = action.todo.id
            const newTodo: TodolistDomainType = {
                id: newId,
                title: action.todo.title,
                addedDate: action.todo.addedDate,
                order: action.todo.order,
                filter: 'all'
            }
            return [newTodo, ...state]

        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((todo) => todo.id === action.tId ? {...todo, title: action.title} : todo)
        }
        case "CHANGE-FILTER": {
            return state.map((todo) => todo.id === action.tId ? {...todo, filter: action.value} : todo)
        }
        default: {
            return state
        }
    }
}


/** ACTION CREATOR*/
export const removeTodolistAC = (tId: string) => ({type: "REMOVE-TODOLIST", tId} ) as const
export const addTodolistAC = (todo:TodolistType) => ({type: "ADD-TODOLIST", todo}) as const
export const changeTodolistTitleAC = (tId: string, title: string) => ({type: "CHANGE-TODOLIST-TITLE", tId, title}) as const
export const filterTodolistAC = (tId: string, value: FilteredTaskType) => ({type: "CHANGE-FILTER", tId, value}) as const
export const getTodoListsAC = (todo: TodolistType[]) => ({type: "GET-TODOLISTS", todolists: todo}) as const




/** THUNK CREATOR*/
export const getTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todolistApi.getTodolist()
            .then((res) => {
                dispatch(getTodoListsAC(res.data))
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




/** ТИПИЗАЦИЯ INITIALSTATE*/
export type FilteredTaskType = 'all' | 'active' | 'completed' //Типизация фильтрации тасок

/** Составная типизация*/
export type TodolistDomainType = TodolistType & {
    filter: FilteredTaskType
}

/** ТИПИЗАЦИЯ ACTION CREATOR*/
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
type ChangeFilterACType = ReturnType<typeof filterTodolistAC>
export type GetTodoListsACType = ReturnType<typeof getTodoListsAC>

/** ТИПИЗАЦИЯ РЕДЮСЕРА*/
type ActionTodolistType = RemoveTodolistType
    | AddTodolistACType
    | ChangeTodolistTitleAC
    | ChangeFilterACType
    | GetTodoListsACType


