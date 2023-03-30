import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistType} from "./todolist-reducer";


/** REDUCER всех действий связанных с Task*/
export const tasksReducer = (state: TaskStateType, action: ActionTasksType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter((task) => task.id !== action.taskId)}
        }
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) => task.id === action.taskId ? {
                    ...task,
                    isDone: action.newIsDone
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
            return {...state, [action.todolistId]: []}
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
    return {
        type: "REMOVE-TASK",
        todolistId,
        taskId
    } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: "ADD-TASK",
        todolistId,
        title
    } as const
}


export const changeTaskStatusAC = (todolistId: string, taskId: string, newIsDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        todolistId,
        newIsDone
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        taskId,
        title,
        todolistId
    } as const
}


/** ТИПИЗАЦИЯ ACTION CREATOR*/
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

/** ТИПИЗАЦИЯ РЕДЮСЕРА*/
type ActionTasksType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType /** КЕЙС ИЗ ТУДУЛИСТА ДЛЯ СОЗДАНИЯ ПУСТОГО МАССИВА ТАСОК */
    | RemoveTodolistType