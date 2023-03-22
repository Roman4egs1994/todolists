
import {TaskStateType} from "../App";
import {v1} from "uuid";


/** REDUCER всех действий связанных с Task*/
export const tasksReducer = (state: TaskStateType, action: ActionTasksType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state,[action.todolistId]: state[action.todolistId].filter((task) => task.id !== action.taskId)}
        }
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state,[action.todolistId]: [newTask,...state[action.todolistId]]}
        }
        default: {
            return state
        }
    }
}


/** ACTION CREATOR*/
export const removeTaskAC = (todolistId: string,taskId:string) => {
    return {
        type: "REMOVE-TASK",
        todolistId,
        taskId
    }as const
}

export const addTaskAC = (todolistId:string,title:string) => {
    return {
        type: "ADD-TASK",
        todolistId,
        title
    } as const
}


/** ТИПИЗАЦИЯ ACTION CREATOR*/
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>

/** ТИПИЗАЦИЯ РЕДЮСЕРА*/
type ActionTasksType = RemoveTaskACType
    | AddTaskACType