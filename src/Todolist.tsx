import React, {ChangeEvent} from 'react';
import {ButtonHandler} from "./common/components/Button/ButtonHandler";
import style from './todolist.module.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {FilteredTaskType} from "./store/todolist-reducer";


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

export function Todolist(props: PropsType) {


    const onclickFilteredTaskHandler = (todolistId: string, buttonName: FilteredTaskType) => {
        if (buttonName === 'completed') {
            props.changeFilter(props.todolistId, 'completed')
        } else if (buttonName === 'active') {
            props.changeFilter(props.todolistId, 'active')
        } else if (buttonName === 'all') {
            props.changeFilter(props.todolistId, 'all')
        }
    }

    /** DELETE-TODOLIST*/
    const onClickDeleteTodoHandler = () => {
        props.deleteTodolist(props.todolistId)
    }

    /** ADD-TASK*/
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    /** CHANGE-TITLE-TODOLIST*/
    const onChangeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }

    // /** Cтили для кнопок фильтрации*/
    const cssInlineStyleButton = {margin: '3px'}

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={onChangeTodolistTitleHandler}/>
            <IconButton aria-label="delete" onClick={onClickDeleteTodoHandler}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <ul>
            {props.tasks.map((task) => {

                /** DELETE-TASK*/
                const onclickDeleteTaskHandler = () => {
                    props.removeTask(props.todolistId, task.id)
                }

                /** CHECKED IS-DONE TASK*/
                const onChangeIsDoneTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    const eventTask = event.currentTarget.checked
                    props.changeTaskStatus(props.todolistId, task.id, eventTask)
                }

                const onClickEditTitleHandler = (newTitle: string) => {
                    props.changeTaskTitle(props.todolistId, task.id, newTitle)
                }


                return (
                    <li key={task.id}>
                        <Checkbox
                            onChange={onChangeIsDoneTaskHandler}
                            checked={task.isDone}
                            className={task.isDone ? style.isDoneTask : ""
                            }/>
                        <EditableSpan title={task.title} callBack={onClickEditTitleHandler}/>

                        <IconButton aria-label="delete" onClick={onclickDeleteTaskHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                )
            })}
        </ul>

        <div>
            <ButtonHandler
                style={cssInlineStyleButton}
                title={'All'}
                callBack={() => onclickFilteredTaskHandler(props.todolistId, 'all')}
                variant={props.filter === 'all' ? "contained" : 'outlined'}
            />
            <ButtonHandler
                style={cssInlineStyleButton}
                title={'Active'}
                callBack={() => onclickFilteredTaskHandler(props.todolistId, 'active')}
                variant={props.filter === 'active' ? "contained" : 'outlined'}
            />
            <ButtonHandler
                style={cssInlineStyleButton}
                title={'Completed'}
                callBack={() => onclickFilteredTaskHandler(props.todolistId, 'completed')}
                variant={props.filter === 'completed' ? "contained" : 'outlined'}
            />
        </div>
    </div>
}
