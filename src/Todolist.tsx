import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilteredTaskType} from "./App";
import {Button} from "./common/components/Button/Button";
import style from './todolist.module.css'

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
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState(``)
    const [error, setError] = useState<null | string>('')

    const onclickFilteredTaskHandler = (todolistId:string,buttonName: FilteredTaskType) => {
        if (buttonName === 'completed') {
            props.changeFilter(props.todolistId,'completed')
        } else if (buttonName === 'active') {
            props.changeFilter(props.todolistId,'active')
        } else if (buttonName === 'all') {
            props.changeFilter(props.todolistId,'all')
        }
    }

    const onChangeInputTitleTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError('')
    }

    /** ADD-TASK*/
    const onclickButtonAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistId,title.trim())
            setTitle('')
        } else {
            setError('Enter text')
        }
    }

    /** ADD-TASK FOR ENTER*/
    const onDoubleClickAddTaskTitleHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onclickButtonAddTaskHandler()
        }
    }

    /** DELETE-TODOLIST*/
    const onClickDeleteTodoHandler = () => {
        props.deleteTodolist(props.todolistId)
    }

    return <div>
        <h3>{props.title}
        <Button title={'x'} callBack={onClickDeleteTodoHandler}/>
        </h3>
        <div>
            <input
                value={title}
                onChange={onChangeInputTitleTaskHandler}
                onKeyPress={onDoubleClickAddTaskTitleHandler}
            />
            <Button title={'+'} callBack={onclickButtonAddTaskHandler}/>
            {error && <div className={style.error}>{error}</div>}
        </div>
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

                return (
                    <li key={task.id}>
                        <input
                            onChange={onChangeIsDoneTaskHandler}
                            type="checkbox"
                            checked={task.isDone}
                            className={task.isDone ? style.isDoneTask : ""}
                        />
                        <span>{task.title}</span>
                        <Button title={'x'} callBack={onclickDeleteTaskHandler}/>
                    </li>
                )
            })}


        </ul>

        {/**{FILTERED-TASK}*/}
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
