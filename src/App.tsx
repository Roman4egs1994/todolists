import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilteredTaskType = 'all' | 'active' | 'completed'

function App() {


    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilteredTaskType>('all')

    const removeTask = (taskId: number) => {
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
            />
        </div>
    );
}

export default App;
