import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC, TodolistDomainType,
    todolistReducer,
} from './todolist-reducer'
import {v1} from 'uuid'

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn',addedDate:"", order:0, filter: 'all'},
        {id: todolistId2, title: 'What to buy',addedDate:"", order:0, filter: 'all'}
    ]
})


/**ТЕСТ НА УДАЛЕНИЕ ТУДУЛИСТА*/
test('correct todolist should be removed', () => {


    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


/**ТЕСТ НА ДОБАВЛЕНИЕ ТУДУЛИСТА*/
test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})


/**ТЕСТ НА ИЗМЕНЕНИЕ ИМЕНИ ТУДУЛИСТА*/
test('correct todolist should change its name', () => {


    let newTodolistTitle = 'New Todolist'


    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }

    const endState = todolistReducer(startState, changeTodolistTitleAC(action.id, action.title))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('фильтр тудулиста должен поменяться' , () => {

    const endState = todolistReducer(startState, changeFilterTodolistAC(todolistId1,'active') )


    expect(endState[0].filter).toBe('active')
    expect(startState[0].filter).toBe('all')
})