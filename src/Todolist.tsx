import React from 'react';
import {FilteredTaskType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    removeTask: (taskId: number) => void
    tasks: Array<TaskType>
    changeFilter: (value: FilteredTaskType) => void
    filter: FilteredTaskType
}

export function Todolist(props: PropsType) {

    const onclickFilteredTaskHandler = (buttonName: FilteredTaskType) => {
        if (buttonName === 'completed') {
            props.changeFilter('completed')
        } else if (buttonName === 'active') {
            props.changeFilter('active')
        } else if (buttonName === 'all') {
            props.changeFilter('all')
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map((task) => {

                const onclickDeleteTaskHandler = () => {
                    props.removeTask(task.id)
                }

                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={onclickDeleteTaskHandler}>✖️</button>
                    </li>
                )
            })}


        </ul>
        <div>
            <button onClick={(event) => {onclickFilteredTaskHandler('all')}}>All</button>
            <button onClick={(event) => {onclickFilteredTaskHandler('active')}}>Active</button>
            <button onClick={(event) => {onclickFilteredTaskHandler('completed')}}>Completed</button>

        </div>
    </div>
}
