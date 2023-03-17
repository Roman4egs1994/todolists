import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilteredTaskType = 'all' | 'active' | 'completed'

function App() {


    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilteredTaskType>('all')

    const addTask = (title: string) => {
        const task: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([task,...tasks])
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((el) => el.id !== taskId))
    }

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

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      filter={filter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
