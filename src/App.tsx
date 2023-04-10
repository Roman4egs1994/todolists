import React, {useCallback, useEffect} from 'react';
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
    addTodolistAC, changeFilterTodolistAC,
    changeTodolistTitleAC,
    FilteredTaskType,
    removeTodolistAC, TodolistDomainType, getTodoListsTC, deleteTodoListTC, addTodoListTC, updateTitleTodolistTC
} from "./store/todolist-reducer";
import {
    addTaskAC, addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskTC,
    removeTaskAC,
    TaskStateType, updateTaskStatusTC, updateTitleStatusTC
} from "./store/tasks-reducer";
import {TaskStatuses, todolistApi} from "./api/todolist-api";
import {useAppDispatch} from "./store/castomUseAppDispatch";

function App() {

    /** State in from Store*/
    const todolists = useSelector<AppRootStateType,TodolistDomainType[]>((state)=> state.todolist)
    const tasks = useSelector<AppRootStateType,TaskStateType>((state)=>state.task)
    // const dispatch = useDispatch()
        const dispatch = useAppDispatch()

    useEffect(()=> {
       dispatch(getTodoListsTC()) //Получение тудулистов
    },[])

    /** ADD-TODOLIST*/
    const addTodolistHandler = useCallback((title: string) => {
        // dispatch(addTodolistAC(title))
        dispatch(addTodoListTC(title))
    },[dispatch])

    /** CHANGE-TITLE-TODOLIST*/
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        // dispatch(changeTodolistTitleAC(todolistId,newTitle))
        dispatch(updateTitleTodolistTC(todolistId,newTitle))
    },[dispatch])
    /** DELETE-TODOLIST*/
    const deleteTodolist = useCallback((todolistsId: string) => {
        // dispatch(removeTodolistAC(todolistsId))
        dispatch(deleteTodoListTC(todolistsId))
    },[dispatch])


    /** ADD-TASK*/
    const addTask = useCallback((todolistId: string, title: string) => {
        // dispatch(addTaskAC(todolistId,title))

            dispatch(addTaskTC(todolistId,title))
    },[dispatch])

    /** DELETE-TASK*/
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        // dispatch(removeTaskAC(todolistId,taskId))
        dispatch(deleteTaskTC(todolistId,taskId))
    },[dispatch])
    /** CHANGE TITLE TASK*/
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        // dispatch(changeTaskTitleAC(todolistId,taskId,newTitle))
        dispatch(updateTitleStatusTC(todolistId,taskId,newTitle))
    },[dispatch])

    /** CHECKED IS-DONE TASK*/
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        // dispatch(changeTaskStatusAC(todolistId,taskId,status))
        dispatch(updateTaskStatusTC(todolistId,taskId,status))
    },[dispatch])

    /** FILTERED-TASK-START--------------------------------------------------------*/
    const changeFilter = useCallback((todolistId: string, value: FilteredTaskType) => {
        dispatch(changeFilterTodolistAC(todolistId,value))
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
