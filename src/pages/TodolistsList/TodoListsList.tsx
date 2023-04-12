import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {addTodoListTC, deleteTodoListTC, FilteredTaskType, filterTodolistAC, getTodoListsTC, TodolistDomainType, updateTitleTodolistTC} from "./todolist-reducer";
import {addTaskTC, deleteTaskTC, TaskStateType, updateTaskTC} from "./tasks-reducer";
import {useAppDispatch} from "../../app/castomDispatch/castomUseAppDispatch";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../api/todolist-api";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";

export const TodoListsList = () => {
    /** State in from Store*/
    const todolists = useSelector<AppRootStateType,TodolistDomainType[]>((state)=> state.todolist)
    const tasks = useSelector<AppRootStateType,TaskStateType>((state)=>state.task)
    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(getTodoListsTC()) //Получение тудулистов
    },[])

    /** ADD-TODOLIST*/
    const addTodolistHandler = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    },[dispatch])

    /** CHANGE-TITLE-TODOLIST*/
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(updateTitleTodolistTC(todolistId,newTitle))
    },[dispatch])

    /** DELETE-TODOLIST*/
    const deleteTodolist = useCallback((todolistsId: string) => {
        dispatch(deleteTodoListTC(todolistsId))
    },[dispatch])

    /** ADD-TASK*/
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId,title))
    },[dispatch])

    /** DELETE-TASK*/
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC(todolistId,taskId))
    },[dispatch])

    /** CHANGE TITLE TASK*/
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId,taskId,{title: title}))
    },[dispatch])

    /** CHECKED IS-DONE TASK*/
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId,taskId,{status: status}))
    },[dispatch])

    /** FILTERED-TASK-START--------------------------------------------------------*/
    const changeFilter = useCallback((todolistId: string, value: FilteredTaskType) => {
        dispatch(filterTodolistAC(todolistId,value))
    },[dispatch])

    return (
        <>
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
        </>
    )
}