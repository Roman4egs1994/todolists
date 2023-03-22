import {TodolistType} from "../App";
import {v1} from "uuid";


export const todolistsReducer = (state: TodolistType[], action: ActionTodolistType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((todo) => todo.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            const newId = v1()
            const newTodo = {id: newId, title: action.title,filter:'all'}
            return  [newTodo, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((todo) => todo.id === action.todolistId ? {...todo, title: action.newTitle} : todo)
        }
        default: {
            return state
        }
    }
}


export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title
    } as const
}

export const changeTodolistTitleAC = (todolistId:string,newTitle:string) =>{
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todolistId,
        newTitle
    }as const
}




type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>


type ActionTodolistType = RemoveTodolistType
    | AddTodolistACType
    | ChangeTodolistTitleAC