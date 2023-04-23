import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../pages/TodolistsList/tasks-reducer";
import {todolistReducer} from "../pages/TodolistsList/todolist-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    task: tasksReducer,
    todolist: todolistReducer,
    appReducer: appReducer
})


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store