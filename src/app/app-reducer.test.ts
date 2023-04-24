import {appReducer, RequestStatusType, setErrorAC, setLoadingStatusAC} from "./app-reducer";

let startState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

beforeEach(()=>{
    startState = {
        status: 'idle',
        error: null
    }
})


test('Ошибка должна поменять статус c null на "Some Error":', ()=> {

    let endState = appReducer(startState,setErrorAC('Some Error'))

    expect(endState.error).toBe('Some Error')
    expect(startState.error).toBe(null)
})


test('Статус загрузки должен поменяться c "idle" на "loading" ',()=>{
    let endState = appReducer(startState,setLoadingStatusAC('loading'))

    expect(endState.status).toBe('loading')
    expect(startState.status).toBe('idle')
} )