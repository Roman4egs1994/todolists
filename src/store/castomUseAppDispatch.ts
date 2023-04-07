import {AppRootStateType} from "./store";
import {AnyAction} from "redux";
import  {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";

/** Кастомный хук dispatch (Упрощает типизацию, нам не нужно будет
 *  каждый раз типизировать dispatch на приходящий store, а так же удаляет ошибку AnyAction при
 *  dispatch Thank
 * */


export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()