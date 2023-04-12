import {AddTodolistACType, GetTodoListsACType, RemoveTodolistType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

const initialState: TaskStateType = {}


/** REDUCER всех действий связанных с Task*/
export const tasksReducer = (state = initialState, action: ActionTasksType): TaskStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            //Одностраничка, таски будут насыпаться вниз страницы
            return {...state, [action.todolistId]: [...action.tasks, ...state[action.todolistId]]}
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
                ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
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
        default: {
            return state
        }
    }
}


/** ACTION CREATOR*/
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: "REMOVE-TASK", todolistId, taskId} )as const
export const addTaskAC = (task: TaskType,) => ({type: "ADD-TASK", task}) as const
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModalType) =>
    ({type: 'UPDATE-TASK', taskId, todolistId, model}) as const
export const setTaskAC = (todolistId: string, tasks: TaskType[]) => ({type: "SET-TASKS", todolistId, tasks}) as const


/** THUNK CREATOR*/
export const setTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.getTask(todolistId)
            .then((res) => {
                dispatch(setTaskAC(todolistId, res.data.items))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
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

        todolistApi.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
            })
    }
}



/** ТИПИЗАЦИЯ initialState*/
export type TaskStateType = {
    [key: string]: TaskType[]
}

/** ТИПИЗАЦИЯ РЕДЮСЕРА*/
type ActionTasksType = RemoveTaskACType
    | AddTaskACType
    | UpdateTaskACType
    | AddTodolistACType /** КЕЙС ИЗ ТУДУЛИСТА ДЛЯ СОЗДАНИЯ ПУСТОГО МАССИВА ТАСОК */
    | RemoveTodolistType
    | GetTodoListsACType
    | SetTaskACType

/** ТИПИЗАЦИЯ ACTION CREATOR*/
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>
type SetTaskACType = ReturnType<typeof setTaskAC>


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


