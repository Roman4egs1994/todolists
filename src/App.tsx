import React from 'react';
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

    const todolists = useSelector<AppRootStateType,TodolistType[]>((state)=> state.todolist)
    const tasks = useSelector<AppRootStateType,TaskStateType>((state)=>state.task)
    const dispatch = useDispatch()




    /** ADD-TODOLIST*/
    const addTodolistHandler = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    /** CHANGE-TITLE-TODOLIST*/
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId,newTitle))
    }
    /** DELETE-TODOLIST*/
    const deleteTodolist = (todolistsId: string) => {
        dispatch(removeTodolistAC(todolistsId))
    }


    /** ADD-TASK*/
    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId,title))
    }

    /** DELETE-TASK*/
    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId,taskId))
    }
    /** CHANGE TITLE TASK*/
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId,taskId,newTitle))
    }

    /** CHECKED IS-DONE TASK*/
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId,taskId,newIsDone))
    }

    /** FILTERED-TASK-START--------------------------------------------------------*/
    const changeFilter = (todolistId: string, value: FilteredTaskType) => {
        dispatch(changeFilterAC(todolistId,value))
    }

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists?.map((el) => {

                        let filterTask = tasks[el.id] //all
                        if (el.filter === 'completed') {
                            filterTask = tasks[el.id].filter((tasks) => tasks.isDone)
                        }
                        if (el.filter === 'active') {
                            filterTask = tasks[el.id].filter((tasks) => !tasks.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}} elevation={3}>
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
