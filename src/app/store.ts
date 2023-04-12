import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../pages/TodolistsList/tasks-reducer";
import {todolistReducer} from "../pages/TodolistsList/todolist-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    task: tasksReducer,
    todolist: todolistReducer
})


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store