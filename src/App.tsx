import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";

export type FilteredTaskType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string,
    title: string,
    filter: FilteredTaskType
}

type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    /** ADD-TODOLIST*/
    const addTodolistHandler = (title: string) => {
        const newId = v1()
        const newTodo: TodolistsType = {id: newId, title: title, filter: 'all'}
        setTodolists([newTodo, ...todolists])
        setTasks({...tasks,[newId]:[]})
    }
    /** CHANGE-TITLE-TODOLIST*/
    const changeTodolistTitle = (todolistId:string,newTitle:string) => {
        setTodolists(todolists.map((el)=> el.id === todolistId ? {...el,title: newTitle} : el))
    }
    /** DELETE-TODOLIST*/
    const deleteTodolist = (todolistsId: string) => {
        setTodolists(todolists.filter((el) => el.id !== todolistsId))
        delete tasks[todolistsId]
    }


    /** ADD-TASK*/
    const addTask = (todolistId: string, title: string) => {

        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    /** DELETE-TASK*/
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((el) => el.id !== taskId)})
    }
    /** CHANGE TITLE TASK*/
    const changeTaskTitle = (todolistId: string, taskId:string,newTitle:string) => {
        setTasks({...tasks,[todolistId]:tasks[todolistId].map((el)=>el.id === taskId ? {...el,title:newTitle}: el)})
    }

    /** CHECKED IS-DONE TASK*/
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        // setTasks(tasks.map((task) => task.id === taskId ? {...task, isDone: newIsDone} : task))
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((el) => el.id === taskId ? {...el, isDone: newIsDone} : el)
        })
    }

    /** FILTERED-TASK-START--------------------------------------------------------*/
    const changeFilter = (todolistId: string, value: FilteredTaskType) => {
        setTodolists(todolists.map((el) => el.id === todolistId ? {...el, filter: value} : el))
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodolistHandler}/>
            {todolists?.map((el) => {

                let filterTask = tasks[el.id] //all
                if (el.filter === 'completed') {
                    filterTask = tasks[el.id].filter((tasks) => tasks.isDone)
                }
                if (el.filter === 'active') {
                    filterTask = tasks[el.id].filter((tasks) => !tasks.isDone)
                }


                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={filterTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        filter={el.filter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTodolist={deleteTodolist}
                        changeTaskTitle = {changeTaskTitle}
                        changeTodolistTitle = {changeTodolistTitle}
                    />
                )
            })}

        </div>
    );
}

export default App;
