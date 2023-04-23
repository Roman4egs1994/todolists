import {ResultCode, todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setErrorAC,
    SetErrorACType,
    setLoadingStatusAC,
    SetStatusACType
} from "../../app/app-reducer";
import {handleServerAppCatchError, handleServerAppThenError} from "../../utils/error-utils";

const initialState: TodolistDomainType[] = []

/** REDUCER всех действий связанных с Todolist*/
export const todolistReducer = (state = initialState, action: ActionTodolistType): TodolistDomainType[] => {
    switch (action.type) {
        case "GET-TODOLISTS": {
            return action.todolists.map((el) => ({...el, filter: "all", entityStatus: 'idle'}))
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
                filter: 'all',
                entityStatus: 'idle'
            }
            return [newTodo, ...state]

        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((todo) => todo.id === action.tId ? {...todo, title: action.title} : todo)
        }
        case "CHANGE-FILTER": {
            return state.map((todo) => todo.id === action.tId ? {...todo, filter: action.value} : todo)
        }
        case "ENTITY-STATUS": {
            return state.map((todo) => todo.id === action.tId ? {...todo, entityStatus: action.entityStatus} : todo)
        }
        default: {
            return state
        }
    }
}


/** ACTION CREATOR*/
export const removeTodolistAC = (tId: string) => ({type: "REMOVE-TODOLIST", tId}) as const
export const addTodolistAC = (todo: TodolistType) => ({type: "ADD-TODOLIST", todo}) as const
export const changeTodolistTitleAC = (tId: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    tId,
    title
}) as const
export const filterTodolistAC = (tId: string, value: FilteredTaskType) => ({type: "CHANGE-FILTER", tId, value}) as const
export const getTodoListsAC = (todo: TodolistType[]) => ({type: "GET-TODOLISTS", todolists: todo}) as const
export const changeTodolistEntityStatusAC = (tId: string, entityStatus: RequestStatusType) => ({
    type: "ENTITY-STATUS",
    tId,
    entityStatus
} as const)


/** THUNK CREATOR*/
export const getTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistApi.getTodolist()
            .then((res) => {
                dispatch(getTodoListsAC(res.data))
                dispatch(setLoadingStatusAC('succeeded'))
            })
            .catch((err)=> {
                handleServerAppCatchError(dispatch,err)
            })
    }
}

export const deleteTodoListTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {

        dispatch(setLoadingStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))

        todolistApi.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === ResultCode.Ok) {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setLoadingStatusAC('succeeded'))
                    // dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
                } else {
                    handleServerAppThenError(dispatch,res.data)
                    dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
                }
            })
            .catch((err) => {
                handleServerAppCatchError(dispatch,err)
                dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
            })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistApi.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === ResultCode.Ok) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setLoadingStatusAC('succeeded'))
                } else {
                    handleServerAppThenError(dispatch, res.data)
                }
            })
            .catch((err)=> {
                handleServerAppCatchError(dispatch,err)
            })
    }
}

export const updateTitleTodolistTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistApi.updateTodolist(todolistId, title)
            .then((res) => {
                if(res.data.resultCode === ResultCode.Ok) {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setLoadingStatusAC('succeeded'))
                } else {
                    handleServerAppThenError(dispatch, res.data)
                }
            })
            .catch((err) => {
                handleServerAppCatchError(dispatch,err)
            })
    }
}


/** ТИПИЗАЦИЯ INITIALSTATE*/
export type FilteredTaskType = 'all' | 'active' | 'completed' //Типизация фильтрации тасок

/** Составная типизация*/
export type TodolistDomainType = TodolistType & {
    filter: FilteredTaskType
    entityStatus: RequestStatusType
}

/** ТИПИЗАЦИЯ ACTION CREATOR*/
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
type ChangeFilterACType = ReturnType<typeof filterTodolistAC>
export type GetTodoListsACType = ReturnType<typeof getTodoListsAC>
type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>

/** ТИПИЗАЦИЯ РЕДЮСЕРА*/
type ActionTodolistType = RemoveTodolistType
    | AddTodolistACType
    | ChangeTodolistTitleAC
    | ChangeFilterACType
    | GetTodoListsACType
    | SetStatusACType
    | ChangeTodolistEntityStatusACType
    | SetErrorACType

