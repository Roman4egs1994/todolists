import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {
    addTodolistAC, changeFilterAC,
    changeTodolistTitleAC,
    FilteredTaskType,
    removeTodolistAC,
    TodolistType
} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskStateType} from "./store/tasks-reducer";






function App() {

    /** State in from Store*/
    const todolists = useSelector<AppRootStateType,TodolistType[]>((state)=> state.todolist)
    const tasks = useSelector<AppRootStateType,TaskStateType>((state)=>state.task)
    const dispatch = useDispatch()


    /** ADD-TODOLIST*/
    const addTodolistHandler = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])

    /** CHANGE-TITLE-TODOLIST*/
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId,newTitle))
    },[dispatch])
    /** DELETE-TODOLIST*/
    const deleteTodolist = useCallback((todolistsId: string) => {
        dispatch(removeTodolistAC(todolistsId))
    },[dispatch])


    /** ADD-TASK*/
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId,title))
    },[dispatch])

    /** DELETE-TASK*/
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId,taskId))
    },[dispatch])
    /** CHANGE TITLE TASK*/
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId,taskId,newTitle))
    },[dispatch])

    /** CHECKED IS-DONE TASK*/
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId,taskId,newIsDone))
    },[dispatch])

    /** FILTERED-TASK-START--------------------------------------------------------*/
    const changeFilter = useCallback((todolistId: string, value: FilteredTaskType) => {
        dispatch(changeFilterAC(todolistId,value))
    },[dispatch])

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((el) => {


                        return (
                            <Grid item key={el.id}>
                                <Paper style={{padding: '10px'}} elevation={3}>

                                    <Todolist
                                        todolistId={el.id}
                                        title={el.title}
                                        tasks={tasks[el.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        filter={el.filter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        deleteTodolist={deleteTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>

    );
}

    export default App;
