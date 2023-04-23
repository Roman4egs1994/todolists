import {AppRootStateType} from "../store";
import {AnyAction} from "redux";
import  {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

/** Кастомный хук dispatch (Упрощает типизацию, нам не нужно будет
 *  каждый раз типизировать dispatch на приходящий store, а так же удаляет ошибку AnyAction при
 *  dispatch Thank
 * */
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()


/** Кастомный хук useSelector (Упрощает типизацию, нам не нужно будет
 *  каждый раз типизировать useSelector на приходящий store. Типизируем только приходящий стейт
 * */

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector