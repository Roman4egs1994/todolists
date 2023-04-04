import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TaskStateType
} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TaskStateType

beforeEach(()=>{
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS',  description:'',todolistId: 'todolistId1',order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',deadline:'',addedDate: ''},
            {id: '2', title: 'JS', description:'',todolistId: 'todolistId1',order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',deadline:'',addedDate: ''},
            {id: '3', title: 'React',  description:'',todolistId: 'todolistId1',order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',deadline:'',addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread',  description:'',todolistId: 'todolistId1',order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',deadline:'',addedDate: ''},
            {id: '2', title: 'milk', description:'',todolistId: 'todolistId1',order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',deadline:'',addedDate: ''},
            {id: '3', title: 'tea',  description:'',todolistId: 'todolistId1',order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',deadline:'',addedDate: ''}
        ]
    }
})


/**УДАЛЕНИЕ TASKS*/
test('correct task should be deleted from correct array', () => {


    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'))

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS',  description:'',todolistId: 'todolistId1',order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',deadline:'',addedDate: ''},
            {id: '2', title: 'JS', description:'',todolistId: 'todolistId1',order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',deadline:'',addedDate: ''},
            {id: '3', title: 'React',  description:'',todolistId: 'todolistId1',order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',deadline:'',addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread',  description:'',todolistId: 'todolistId2',order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',deadline:'',addedDate: ''},
            {id: '2', title: 'milk', description:'',todolistId: 'todolistId2',order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',deadline:'',addedDate: ''},
        ]
    })
}),


    /** ДОБАВЛЕНИЕ ТАСКИ*/
    test('correct task should be added to correct array', () => {

        const action = addTaskAC('todolistId2', 'juce')
        const endState = tasksReducer(startState, action)

        expect(endState['todolistId1'].length).toBe(3)
        expect(endState['todolistId2'].length).toBe(4)
        expect(endState['todolistId2'][0].id).toBeDefined()
        expect(endState['todolistId2'][0].title).toBe('juce')
        expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
    }),



    /** ИЗМЕНЕНИЕ СТАТУСА ТАСКИ*/
    test('status of specified task should be changed', () => {

        const action = changeTaskStatusAC('todolistId2', '2', TaskStatuses.Completed)
        const endState = tasksReducer(startState, action)

        expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
        expect(startState['todolistId2'][1].status).toBe(TaskStatuses.New)

    })


/** ИЗМЕНЕНИЕ TITLE TASK*/
test('title task of specified task should be changed', () => {

    const action = changeTaskTitleAC('todolistId2', '2', 'bear')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('bear')
    expect(startState['todolistId2'][1].title).toBe('milk')
})



/** ПОИСК НОВОГО ID и Создание пустого массива тасок*/
test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState) /** Массив,тип данных:string, ['todolistId1','todolistId2','todolistId3'] */
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')  /** находим третий ключ */
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


/**  УДАЛЕНИЕ ТАСОК */
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
