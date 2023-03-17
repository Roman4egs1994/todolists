import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilteredTaskType = 'all' | 'active' | 'completed'

function App() {

    /** STATE */
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilteredTaskType>('all')


    /** ADD-TASK*/
    const addTask = (title: string) => {
        const task: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([task,...tasks])
    }

    /** DELETE-TASK*/
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((el) => el.id !== taskId))
    }

    /** CHECKED IS-DONE TASK*/
    const changeTaskStatus = (taskId:string,newIsDone:boolean) => {
        setTasks(tasks.map((task)=> task.id === taskId ? {...task,isDone: newIsDone} : task))
    }

    /** FILTERED-TASK-START--------------------------------------------------------*/
    const filteredTasks = () => {
        let filterTask = tasks //all
        if (filter === 'completed') {
            filterTask = tasks.filter((tasks) => tasks.isDone)
        }
        if (filter === 'active') {
            filterTask = tasks.filter((tasks) => !tasks.isDone)
        }
        return filterTask
    }


    const changeFilter = (value: FilteredTaskType) => {
        setFilter(value)
    }
    /** FILTERED-TASK-FINISH--------------------------------------------------------*/
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      filter={filter}
                      addTask={addTask}
                      changeTaskStatus = {changeTaskStatus}
            />
        </div>
    );
}

export default App;
