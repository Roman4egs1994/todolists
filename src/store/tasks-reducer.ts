import {v1} from "uuid";
import {AddTodolistACType, GetTodolistsACType, RemoveTodolistType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState: TaskStateType = {}


/** REDUCER всех действий связанных с Task*/
export const tasksReducer = (state = initialState, action: ActionTasksType): TaskStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            //Одностраничка, таски будут насыпаться вниз страницы
           return  {...state,[action.todolistId] : [...action.tasks, ...state[action.todolistId]]}
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

            return {
                ...state, [action.task.todoListId]:[action.task, ...state[action.task.todoListId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) => task.id === action.taskId ? {
                    ...task,
                    status: action.status
                } : task)
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) => task.id === action.taskId
                    ? {...task, title: action.title}
                    : task)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistId] //Удаление тасок
            return copyState
        }
        default: {
            return state
        }
    }
}


/** ACTION CREATOR*/
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: "REMOVE-TASK", todolistId, taskId} as const
}


export const addTaskAC = (task:TaskType,) => {
    return {type: "ADD-TASK", task} as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, todolistId, status} as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TITLE-TASK', taskId, title, todolistId} as const
}

export const setTaskAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: "SET-TASKS", todolistId, tasks} as const
}

/** ТИПИЗАЦИЯ ACTION CREATOR*/
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type SetTaskACType = ReturnType<typeof setTaskAC>

/** ТИПИЗАЦИЯ РЕДЮСЕРА*/
type ActionTasksType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType /** КЕЙС ИЗ ТУДУЛИСТА ДЛЯ СОЗДАНИЯ ПУСТОГО МАССИВА ТАСОК */
    | RemoveTodolistType
    | GetTodolistsACType
    | SetTaskACType

/** ТИПИЗАЦИЯ initialState*/
export type TaskStateType = {
    [key: string]: TaskType[]
}


export const setTaskTC = (todolistId:string) => {
    return (dispatch:Dispatch)=>  {
        todolistApi.getTask(todolistId)
            .then((res) => {
                dispatch(setTaskAC(todolistId, res.data.items))
            })
    }
}

export const deleteTaskTC = (todolistId:string,taskId:string) => {
    return (dispatch: Dispatch) => {
        todolistApi.deleteTask(todolistId,taskId)
            .then((res)=>{
                dispatch(removeTaskAC(todolistId,taskId))
            })
    }
}

export const addTaskTC = (todolistId:string, title:string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTask(todolistId,title)
            .then((res)=>{
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}


export const updateTaskStatusTC = (todolistId:string,taskId:string, status:TaskStatuses) => {

    return (dispatch:Dispatch, getState:()=> AppRootStateType)=> {
        const task = getState().task[todolistId].find((el)=> el.id === taskId)

        if(!task) {
            return console.warn('not found task')
        }
        const model:UpdateTaskModelType = {
            title: task.title,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            description: task.description,
            status
        }

        todolistApi.updateTask(todolistId,taskId,model)
            .then((res)=> {
                dispatch(changeTaskStatusAC(todolistId,taskId,status))
            })
    }
}

export const updateTitleStatusTC = (todolistId:string,taskId:string, title:string) => {

    return (dispatch:Dispatch, getState:()=> AppRootStateType)=> {
        const task = getState().task[todolistId].find((el)=> el.id === taskId)

        if(!task) {
            return console.warn('not found task')
        }
        const model:UpdateTaskModelType = {
            status: task.status,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            description: task.description,
            title
        }

        todolistApi.updateTask(todolistId,taskId,model)
            .then((res)=> {
                dispatch(changeTaskTitleAC(todolistId,taskId,title))
            })
    }
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