import {setErrorAC, setLoadingStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {changeTodolistEntityStatusAC} from "../pages/TodolistsList/todolist-reducer";
import {ResponseType} from "../api/todolist-api";


/** Утилита для сокращения кода при использовании промиса в методе Catch */
export const handleServerAppCatchError = (dispatch: Dispatch, error: { message: string }) => {
    dispatch(setLoadingStatusAC('failed'))
    dispatch(setErrorAC(error.message))
}


/** Утилита для сокращения кода при использовании промиса в методе Then
 *  при отработке ошибок (ResultCode !== 0 )
 * */
export const handleServerAppThenError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else { //если backend забыл положить ошибку
        dispatch(setErrorAC('Error not found, contact technical support'))
    }
    dispatch(dispatch(setLoadingStatusAC('failed')))
}


// Дженериковая функция
// function identity<T>(arg: T): T {
//     return  arg
// }
