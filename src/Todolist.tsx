import React from 'react';
import {FilteredTaskType} from "./App";
import {Button} from "./common/components/Button/Button";

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
            <Button title={'All'} callBack={()=>onclickFilteredTaskHandler('all')}/>
            <Button title={'Active'} callBack={()=>onclickFilteredTaskHandler('active')}/>
            <Button title={'Completed'} callBack={()=>onclickFilteredTaskHandler('completed')}/>
        </div>
    </div>
}
