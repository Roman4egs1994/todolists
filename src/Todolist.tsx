import React, {ChangeEvent, memo, useCallback} from 'react';
import {ButtonFilterTask} from "./common/components/Button/ButtonFilterTask";
import style from './todolist.module.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {FilteredTaskType} from "./store/todolist-reducer";
import {Task} from "./components/task/Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    removeTask: (todolistId: string, taskId: string) => void
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, value: FilteredTaskType) => void
    filter: FilteredTaskType
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = memo((props: PropsType) => {


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
    let tasks = props.tasks //all
    if (props.filter === 'completed') {
        tasks = tasks.filter((tasks) => tasks.isDone)
    }
    if (props.filter === 'active') {
        tasks = tasks.filter((tasks) => !tasks.isDone)
    }


    /** DELETE-TASK*/
    const onclickDeleteTaskHandler = useCallback((taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }, [props.removeTask, props.todolistId])

    /** CHECKED IS-DONE TASK*/
    const onChangeIsDoneTaskHandler = useCallback((taskId: string, isDone: boolean) => {
        // let eventTask = event.currentTarget.checked
        props.changeTaskStatus(props.todolistId, taskId, isDone)
    }, [props.removeTask, props.todolistId])

    /** CHECKED IS-DONE TASK*/
    const onClickEditTitleHandler = useCallback((taskId: string, newTitle: string) => {
        props.changeTaskTitle(props.todolistId, taskId, newTitle)
    }, [props.changeTaskTitle, props.todolistId])

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={onChangeTodolistTitleHandler}/>
            <IconButton aria-label="delete" onClick={onClickDeleteTodoHandler}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>

        {tasks.map((el) => {
            return (
                <Task
                    key={el.id}
                    task={el}
                    removeTask={onclickDeleteTaskHandler}
                    changeTaskStatus={onChangeIsDoneTaskHandler}
                    changeTaskTitle={onClickEditTitleHandler}
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
                title={'Completed'}
                callBack={() => onclickFilteredTaskHandler(props.todolistId, 'completed')}
                variant={props.filter === 'completed' ? "contained" : 'outlined'}
            />
        </div>
    </div>
})
