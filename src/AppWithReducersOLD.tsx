/**  Компонента для практики редюсеров и хука useReducer
 *   не актуальна по причине создания полноценного redux
 * */


import React, {useReducer, useState} from 'react';
import './App.css';
// import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {v1} from "uuid";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./store/todolist-reducer";
import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

// export type FilteredTaskType = 'all' | 'active' | 'completed'
//
// export type TodolistType = {
//     id: string,
//     title: string,
//     filter: FilteredTaskType
// }
//
// export type TaskStateType = {
//     [key: string]: TaskType[]
// }

export function AppWithReducersOLD() {


    // let todolistID1 = v1()
    // let todolistID2 = v1()
    //
    // let [todolists, dispatchToTodolists] = useReducer(todolistReducer,[
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])
    //
    // let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
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
    //
    //
    // /** ADD-TODOLIST*/
    // const addTodolistHandler = (title: string) => {
    //     // const newId = v1()
    //     // const newTodo: TodolistType = {id: newId, title: title, filter: 'all'}
    //     // setTodolists([newTodo, ...todolists])
    //     // setTasks({...tasks, [newId]: []})
    //
    //     const action = addTodolistAC(title)
    //     dispatchToTasks(action)
    //     dispatchToTodolists(action)
    // }
    // /** CHANGE-TITLE-TODOLIST*/
    // const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    //     // setTodolists(todolists.map((el) => el.id === todolistId ? {...el, title: newTitle} : el))
    //
    //     dispatchToTodolists(changeTodolistTitleAC(todolistId,newTitle))
    // }
    // /** DELETE-TODOLIST*/
    // const deleteTodolist = (todolistsId: string) => {
    //     // setTodolists(todolists.filter((el) => el.id !== todolistsId))
    //     // delete tasks[todolistsId]
    //
    //     const action = removeTodolistAC(todolistsId)
    //     dispatchToTodolists(action)
    //     dispatchToTasks(action)
    // }
    //
    //
    // /** ADD-TASK*/
    // const addTask = (todolistId: string, title: string) => {
    //
    //     // const newTask: TaskType = {id: v1(), title: title, isDone: false}
    //     // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    //
    //     dispatchToTasks(addTaskAC(todolistId,title))
    // }
    //
    // /** DELETE-TASK*/
    // const removeTask = (todolistId: string, taskId: string) => {
    //     // setTasks({...tasks, [todolistId]: tasks[todolistId].filter((el) => el.id !== taskId)})
    //
    //     dispatchToTasks(removeTaskAC(todolistId,taskId))
    // }
    // /** CHANGE TITLE TASK*/
    // const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    //     // setTasks({
    //     //     ...tasks,
    //     //     [todolistId]: tasks[todolistId].map((el) => el.id === taskId ? {...el, title: newTitle} : el)
    //     // })
    //     dispatchToTasks(changeTaskTitleAC(todolistId,taskId,newTitle))
    // }
    //
    // /** CHECKED IS-DONE TASK*/
    // const changeTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
    //     // setTasks(tasks.map((task) => task.id === taskId ? {...task, isDone: newIsDone} : task))
    //     // setTasks({
    //     //     ...tasks,
    //     //     [todolistId]: tasks[todolistId].map((el) => el.id === taskId ? {...el, isDone: newIsDone} : el)
    //     // })
    //     dispatchToTasks(changeTaskStatusAC(todolistId,taskId,newIsDone))
    // }
    //
    // /** FILTERED-TASK-START--------------------------------------------------------*/
    // const changeFilter = (todolistId: string, value: FilteredTaskType) => {
    //     // setTodolists(todolists.map((el) => el.id === todolistId ? {...el, filter: value} : el))
    //
    //     dispatchToTodolists(changeFilterAC(todolistId,value))
    // }

    return (
        <div>
        {/*    <ButtonAppBar/>*/}
        {/*    <Container fixed>*/}
        {/*        <Grid container style={{padding: '20px'}}>*/}
        {/*            <AddItemForm callBack={addTodolistHandler}/>*/}
        {/*        </Grid>*/}
        {/*        <Grid container spacing={3}>*/}
        {/*            {todolists?.map((el) => {*/}

        {/*                let filterTask = tasks[el.id] //all*/}
        {/*                if (el.filter === 'completed') {*/}
        {/*                    filterTask = tasks[el.id].filter((tasks) => tasks.isDone)*/}
        {/*                }*/}
        {/*                if (el.filter === 'active') {*/}
        {/*                    filterTask = tasks[el.id].filter((tasks) => !tasks.isDone)*/}
        {/*                }*/}
        {/*                return (*/}
        {/*                    <Grid item>*/}
        {/*                        <Paper style={{padding: '10px'}} elevation={3}>*/}
        {/*                            <Todolist*/}
        {/*                                key={el.id}*/}
        {/*                                todolistId={el.id}*/}
        {/*                                title={el.title}*/}
        {/*                                tasks={filterTask}*/}
        {/*                                removeTask={removeTask}*/}
        {/*                                changeFilter={changeFilter}*/}
        {/*                                filter={el.filter}*/}
        {/*                                addTask={addTask}*/}
        {/*                                changeTaskStatus={changeTaskStatus}*/}
        {/*                                deleteTodolist={deleteTodolist}*/}
        {/*                                changeTaskTitle={changeTaskTitle}*/}
        {/*                                changeTodolistTitle={changeTodolistTitle}*/}
        {/*                            />*/}
        {/*                        </Paper>*/}
        {/*                    </Grid>*/}
        {/*                )*/}
        {/*            })}*/}
        {/*        </Grid>*/}
        {/*    </Container>*/}
        </div>

    );
}

    {/*export default AppWithReducersOLD;*/}
