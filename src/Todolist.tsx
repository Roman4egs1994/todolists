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
    title: string
    removeTask: (taskId: string) => void
    tasks: Array<TaskType>
    changeFilter: (value: FilteredTaskType) => void
    filter: FilteredTaskType
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState(``)
    const [error, setError] = useState<null | string>('')

    const onclickFilteredTaskHandler = (buttonName: FilteredTaskType) => {
        if (buttonName === 'completed') {
            props.changeFilter('completed')
        } else if (buttonName === 'active') {
            props.changeFilter('active')
        } else if (buttonName === 'all') {
            props.changeFilter('all')
        }
    }

    const onChangeInputTitleTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError('')
    }

    /** ADD-TASK*/
    const onclickButtonAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
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

    return <div>
        <h3>{props.title}</h3>
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
                    props.removeTask(task.id)
                }

                /** CHECKED IS-DONE TASK*/
                const onChangeIsDoneTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    const eventTask = event.currentTarget.checked
                    props.changeTaskStatus(task.id, eventTask)
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
                callBack={() => onclickFilteredTaskHandler('all')}
            />
            <Button
                className={props.filter === 'active' ? style.filterButton : ''}
                title={'Active'}
                callBack={() => onclickFilteredTaskHandler('active')}/>
            <Button
                className={props.filter === 'completed' ? style.filterButton : ''}
                title={'Completed'}
                callBack={() => onclickFilteredTaskHandler('completed')}/>
        </div>
    </div>
}
