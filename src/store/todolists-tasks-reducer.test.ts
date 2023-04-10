import {addTodolistAC, TodolistDomainType, todolistReducer} from "./todolist-reducer";
import {tasksReducer, TaskStateType} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: TodolistDomainType[] = []

    const action = addTodolistAC({id: "todolistId3",title:"todo", order:1,addedDate:""})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})
