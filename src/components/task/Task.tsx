import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import style from "../../todolist.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = memo(({task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {




    /** DELETE-TASK*/
    const onclickDeleteTaskHandler = () => {
        removeTask(task.id)
    }

    /** CHECKED IS-DONE TASK*/
    const onChangeIsDoneTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const eventTask = event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        changeTaskStatus(task.id, eventTask)
    }

    /** CHECKED IS-DONE TASK*/
    const onClickEditTitleHandler = (newTitle: string) => {
        changeTaskTitle(task.id, newTitle)
    }

    return (
        <div>
            <Checkbox
                onChange={onChangeIsDoneTaskHandler}
                checked={task.status === TaskStatuses.Completed}
                className={task.status === TaskStatuses.Completed ? style.isDoneTask : ""}
            />
            <EditableSpan title={task.title} callBack={onClickEditTitleHandler}/>

            <IconButton aria-label="delete" onClick={onclickDeleteTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
});
