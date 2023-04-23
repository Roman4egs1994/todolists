import {AddTodolistACType, GetTodoListsACType, RemoveTodolistType} from "./todolist-reducer";
import {
    ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistApi,
    UpdateTaskModelType
} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {
    RequestStatusType,
    setErrorAC,
    SetErrorACType,
    setLoadingStatusAC,
    SetStatusACType
} from "../../app/app-reducer";
import {handleServerAppCatchError, handleServerAppThenError} from "../../utils/error-utils";
import {dark} from "@mui/material/styles/createPalette";
import {AxiosError} from "axios";

const initialState: TaskStateType = {}


/** REDUCER всех действий связанных с Task*/
export const tasksReducer = (state = initialState, action: ActionTasksType): TaskStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            //Одностраничка, таски будут насыпаться вниз страницы
            // return {...state, [action.todolistId]: [...action.tasks, ...state[action.todolistId]]}
            return {...state,[action.todolistId]: action.tasks.map((el) => ({...el,entityTaskStatus:'idle' }))}
        }
        case "GET-TODOLISTS": {
            let stateCopy = {...state}
            action.todolists.forEach((el) => {
                stateCopy[el.id] = []
            })
            return stateCopy
        }
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter((task) => task.id !== action.taskId)}
        }
        case "ADD-TASK": {

            const task: TaskDomainType  = {
                id: action.task.id,
                title: action.task.title,
                description: action.task.description,
                todoListId: action.task.todoListId,
                order: action.task.order,
                status: action.task.status,
                priority: action.task.priority,
                startDate: action.task.startDate,
                deadline: action.task.deadline,
                addedDate: action.task.addedDate,
                entityTaskStatus: 'idle'
            }

            return {
                ...state, [action.task.todoListId]: [task, ...state[action.task.todoListId]]
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) => task.id === action.taskId
                    ? {...task, ...action.model}
                    : task
                )
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todo.id]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.tId] //Удаление тасок
            return copyState
        }
        case "CHANGE-TASK-ENTITY": {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map((task) => task.id === action.taskId
                    ? {...task, entityTaskStatus: action.entityTaskStatus}
                    : task
                )
            }
        }
        default: {
            return state
        }
    }
}


/** ACTION CREATOR*/
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: "REMOVE-TASK", todolistId, taskId}) as const
export const addTaskAC = (task: TaskType,) => ({type: "ADD-TASK", task}) as const
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModalType) =>
    ({type: 'UPDATE-TASK', taskId, todolistId, model}) as const
export const setTaskAC = (todolistId: string, tasks: TaskType[]) => ({type: "SET-TASKS", todolistId, tasks}) as const
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, entityTaskStatus: RequestStatusType) => {
    return {
        type: "CHANGE-TASK-ENTITY",
        todolistId,
        taskId,
        entityTaskStatus
    } as const
}

/** THUNK CREATOR*/
export const setTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistApi.getTask(todolistId)
            .then((res) => {
                dispatch(setTaskAC(todolistId, res.data.items))
                dispatch(setLoadingStatusAC('succeeded'))
            })
            .catch((err) => {
                handleServerAppCatchError(dispatch, err)
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC(todolistId,taskId,'loading'))
        todolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === ResultCode.Ok) {
                    dispatch(removeTaskAC(todolistId, taskId))
                    dispatch(setLoadingStatusAC('succeeded'))
                } else {
                    handleServerAppThenError(dispatch, res.data)
                    dispatch(changeTaskEntityStatusAC(todolistId,taskId,'failed'))
                }
            })
            .catch((err) => {
                handleServerAppCatchError(dispatch, err)
                dispatch(changeTaskEntityStatusAC(todolistId,taskId,'failed'))
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistApi.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === ResultCode.Ok) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setLoadingStatusAC('succeeded'))
                } else {
                    handleServerAppThenError(dispatch, res.data)
                }
            })
            .catch((err) => {
                handleServerAppCatchError(dispatch, err)
            })
    }
}


export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModalType) => {

    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const task = getState().task[todolistId].find((el) => el.id === taskId)
        if (!task) {
            return console.warn('not found task')
        }

        const apiModel: UpdateTaskModelType = { //model in api
            title: task.title,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            description: task.description,
            status: task.status,
            ...domainModel // перезапись измененных параметров
        }
        dispatch(setLoadingStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC(todolistId,taskId,'loading'))
        todolistApi.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === ResultCode.Ok) {
                    dispatch(updateTaskAC(todolistId, taskId, domainModel))
                    dispatch(setLoadingStatusAC('succeeded'))
                    dispatch(changeTaskEntityStatusAC(todolistId,taskId,'succeeded'))
                } else {
                    handleServerAppThenError(dispatch,res.data)
                    dispatch(changeTaskEntityStatusAC(todolistId,taskId,'failed'))
                }
            })
            .catch((err) => {
                handleServerAppCatchError(dispatch, err)
                dispatch(changeTaskEntityStatusAC(todolistId,taskId,'failed'))
            })
    }
}


/** ТИПИЗАЦИЯ initialState*/
export type TaskStateType = {
    [key: string]: TaskDomainType[]
}

export type TaskDomainType = TaskType & {
    entityTaskStatus: RequestStatusType
}

/** ТИПИЗАЦИЯ РЕДЮСЕРА*/
type ActionTasksType = RemoveTaskACType
    | AddTaskACType
    | UpdateTaskACType
    | AddTodolistACType /** КЕЙС ИЗ ТУДУЛИСТА ДЛЯ СОЗДАНИЯ ПУСТОГО МАССИВА ТАСОК */
    | RemoveTodolistType
    | GetTodoListsACType
    | SetTaskACType
    | SetStatusACType
    | SetErrorACType
    | ChangeTaskEntityStatusACType

/** ТИПИЗАЦИЯ ACTION CREATOR*/
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>
type SetTaskACType = ReturnType<typeof setTaskAC>
type ChangeTaskEntityStatusACType = ReturnType<typeof changeTaskEntityStatusAC>


/** Для обновления Task (title и isDone) */
type UpdateDomainTaskModalType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


// let todolistID1 = v1()
// let todolistID2 = v1()
//
// let [todolists, setTodolists] = useState<Array<TodolistType>>([
//     {id: todolistID1, title: 'What to learn', filter: 'all'},
//     {id: todolistID2, title: 'What to buy', filter: 'all'},
// ])
//
// let [tasks, setTasks] = useState<TaskStateType>({
//     [todolistID1]: [
//         {id: v1(), title: 'HTML&CSS', isDone: true},
//         {id: v1(), title: 'JS', isDone: true},
//         {id: v1(), title: 'ReactJS', isDone: false},
//
//     ],
//     [todolistID2]: [
//         {id: v1(), title: 'Rest API', isDone: true},
//         {id: v1(), title: 'GraphQL', isDone: false},
//     ]
// })


