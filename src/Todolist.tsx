import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilteredTaskType} from "./App";
import {Button} from "./common/components/Button/Button";
import style from './todolist.module.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId:string
    title: string
    removeTask: (todolistId:string,taskId: string) => void
    tasks: Array<TaskType>
    changeFilter: (todolistId: string,value: FilteredTaskType) => void
    filter: FilteredTaskType
    addTask: (todolistId: string,title: string) => void
    changeTaskStatus: (todolistId: string,taskId: string, newIsDone: boolean) => void
    deleteTodolist:(todolistId:string) => void
    changeTaskTitle: (todolistId: string, taskId:string,newTitle:string) => void
    changeTodolistTitle: (todolistId:string,newTitle:string) => void
}

export function Todolist(props: PropsType) {


    const onclickFilteredTaskHandler = (todolistId:string,buttonName: FilteredTaskType) => {
        if (buttonName === 'completed') {
            props.changeFilter(props.todolistId,'completed')
        } else if (buttonName === 'active') {
            props.changeFilter(props.todolistId,'active')
        } else if (buttonName === 'all') {
            props.changeFilter(props.todolistId,'all')
        }
    }

    /** DELETE-TODOLIST*/
    const onClickDeleteTodoHandler = () => {
        props.deleteTodolist(props.todolistId)
    }

    /** ADD-TASK*/
    const addTaskHandler = (title:string) => {
        props.addTask(props.todolistId,title)
    }

    /** CHANGE-TITLE-TODOLIST*/
    const onChangeTodolistTitleHandler = (newTitle:string) => {
        props.changeTodolistTitle(props.todolistId,newTitle)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={onChangeTodolistTitleHandler}/>
        <Button title={'x'} callBack={onClickDeleteTodoHandler}/>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <ul>
            {props.tasks.map((task) => {

                /** DELETE-TASK*/
                const onclickDeleteTaskHandler = () => {
                    props.removeTask(props.todolistId,task.id)
                }

                /** CHECKED IS-DONE TASK*/
                const onChangeIsDoneTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    const eventTask = event.currentTarget.checked
                    props.changeTaskStatus(props.todolistId,task.id, eventTask)
                }

                const onClickEditTitleHandler = (newTitle:string) => {
                    props.changeTaskTitle(props.todolistId,task.id,newTitle)
                }


                return (
                    <li key={task.id}>
                        <input
                            onChange={onChangeIsDoneTaskHandler}
                            type="checkbox"
                            checked={task.isDone}
                            className={task.isDone ? style.isDoneTask : ""}
                        />
                        {/*<span>{task.title}</span>*/}
                        <EditableSpan  title={task.title} callBack={onClickEditTitleHandler}/>
                        <Button title={'x'} callBack={onclickDeleteTaskHandler}/>
                    </li>
                )
            })}


        </ul>


        <div>
            <Button
                className={props.filter === 'all' ? style.filterButton : ''}
                title={'All'}
                callBack={() => onclickFilteredTaskHandler(props.todolistId,'all')}
            />
            <Button
                className={props.filter === 'active' ? style.filterButton : ''}
                title={'Active'}
                callBack={() => onclickFilteredTaskHandler(props.todolistId,'active')}/>
            <Button
                className={props.filter === 'completed' ? style.filterButton : ''}
                title={'Completed'}
                callBack={() => onclickFilteredTaskHandler(props.todolistId,'completed')}/>
        </div>
    </div>
}
