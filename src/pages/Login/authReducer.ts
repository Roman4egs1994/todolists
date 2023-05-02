import {Dispatch} from "redux";
import {SetErrorACType, setLoadingStatusAC, SetStatusACType} from "../../app/app-reducer";
import {authAPI, LoginParamsType, ResultCode} from "../../api/todolist-api";
import {handleServerAppCatchError, handleServerAppThenError} from "../../utils/error-utils";
import {dark} from "@mui/material/styles/createPalette";


const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: AuthReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value}
        }
        case "IS-INITIALIZED": {
            return {...state, isInitialized: action.isInitializedAC}
        }
        default:
            return state
    }
}


export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitializedAC = (isInitializedAC: boolean) =>
    ({type: "IS-INITIALIZED", isInitializedAC}) as const

export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        authAPI.login(data)
            .then((res) => {
                if (res.data.resultCode === ResultCode.Ok) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setLoadingStatusAC('succeeded'))
                    // console.log(res.data.data.userId)
                } else {
                    handleServerAppThenError(dispatch, res.data)
                }
            })
            .catch((err) => {
                handleServerAppThenError(dispatch, err)
            })
    }
}


export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then((res) => {
                if (res.data.resultCode === ResultCode.Ok) {
                    dispatch(setIsLoggedInAC(true))
                } else {
                    handleServerAppThenError(dispatch, res.data)
                }
            })
            .catch((err) => {
                handleServerAppCatchError(dispatch, err)
            })
            .finally(() => {
                dispatch(setIsInitializedAC(true))
            })
    }
}

export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        authAPI.logout()
            .then((res) => {
                if (res.data.resultCode === ResultCode.Ok) {
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setLoadingStatusAC('succeeded'))
                } else {
                    handleServerAppThenError(dispatch,res.data)
                }
            })
            .catch((err)=>{
                handleServerAppCatchError(dispatch,err)
            })
    }


}

type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>

type AuthReducerActionsType =
    SetIsLoggedInACType |
    SetErrorACType |
    SetStatusACType
    | SetIsInitializedACType