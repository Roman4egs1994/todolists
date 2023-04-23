import React, { memo, useCallback, useEffect} from 'react';
import {ButtonFilterTask} from "../../../components/Button/ButtonFilterTask";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {FilteredTaskType} from "../todolist-reducer";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {useAppDispatch} from "../../../app/castomDispatch/castomUseAppDispatch";
import {setTaskTC, TaskDomainType} from "../tasks-reducer";
import {RequestStatusType} from "../../../app/app-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";




type PropsType = {
    todolistId: string
    title: string
    removeTask: (todolistId: string, taskId: string) => void
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, value: FilteredTaskType) => void
    filter: FilteredTaskType
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    entityStatus: RequestStatusType
}

export const Todolist = memo((props: PropsType) => {

    const dispatch = useAppDispatch()

    let tasksTodo = useSelector<AppRootStateType,TaskDomainType[]>((state)=>state.task[props.todolistId])


    useEffect(()=> {
       dispatch(setTaskTC(props.todolistId))
    },[])

    /** FILTER-TASKS*/
    const onclickFilteredTaskHandler = useCallback((todolistId: string, buttonName: FilteredTaskType) => {
        if (buttonName === 'completed') {
            props.changeFilter(props.todolistId, 'completed')
        } else if (buttonName === 'active') {
            props.changeFilter(props.todolistId, 'active')
        } else if (buttonName === 'all') {
            props.changeFilter(props.todolistId, 'all')
        }
    }, [props.changeFilter, props.todolistId])

    /** DELETE-TODOLIST*/
    const onClickDeleteTodoHandler = () => {
        props.deleteTodolist(props.todolistId)
    }

    /** ADD-TASK*/
    const addTaskHandler = useCallback((title: string) => {

        props.addTask(props.todolistId, title)
    }, [props.addTask, props.todolistId])

    /** CHANGE-TITLE-TODOLIST*/
    const onChangeTodolistTitleHandler = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }, [props.changeTodolistTitle, props.todolistId])


    /** Cтили для кнопок фильтрации*/
    const cssInlineStyleButton = {margin: '3px'}


    /** Фильтрация тасок */


   // let tasks = props.tasks //all
   let tasks = tasksTodo //all
    if (props.filter === 'completed') {
        tasks = tasks.filter((tasks) => tasks.status)
    }
    if (props.filter === 'active') {
        tasks = tasks.filter((tasks) => !tasks.status)
    }


    /** DELETE-TASK*/
    const onclickDeleteTaskHandler = useCallback((taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }, [props.removeTask, props.todolistId])

    /** CHECKED IS-DONE TASK*/
    const onChangeIsDoneTaskHandler = useCallback((taskId: string, status: TaskStatuses) => {
        // let eventTask = event.currentTarget.checked
        props.changeTaskStatus(props.todolistId, taskId, status)
    }, [props.removeTask, props.todolistId])

    /** CHECKED TITLE TASK*/
    const onClickEditTitleHandler = useCallback((taskId: string, newTitle: string) => {
        props.changeTaskTitle(props.todolistId, taskId, newTitle)
    }, [props.changeTaskTitle, props.todolistId])

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={onChangeTodolistTitleHandler}/>
            <IconButton aria-label="delete" onClick={onClickDeleteTodoHandler} disabled={props.entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler} disabled={props.entityStatus === 'loading'}/>

        {tasks.map((el) => {
            return (
                <Task
                    key={el.id}
                    task={el}
                    removeTask={onclickDeleteTaskHandler}
                    changeTaskStatus={onChangeIsDoneTaskHandler}
                    changeTaskTitle={onClickEditTitleHandler}
                    // entityTaskStatus={el.entityTaskStatus}
                    disabled={el.entityTaskStatus === 'loading'}
                />
            )
        })}
        <div>
            <ButtonFilterTask
                style={cssInlineStyleButton}
                title={'All'}
                callBack={() => onclickFilteredTaskHandler(props.todolistId, 'all')}
                variant={props.filter === 'all' ? "contained" : 'outlined'}
            />
            <ButtonFilterTask
                style={cssInlineStyleButton}
                title={'Active'}
                callBack={() => onclickFilteredTaskHandler(props.todolistId, 'active')}
                variant={props.filter === 'active' ? "contained" : 'outlined'}
            />
            <ButtonFilterTask
                style={cssInlineStyleButton}
                title={'Complete'}
                callBack={() => onclickFilteredTaskHandler(props.todolistId, 'completed')}
                variant={props.filter === 'completed' ? "contained" : 'outlined'}
            />
        </div>
    </div>
})
