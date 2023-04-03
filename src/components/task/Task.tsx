import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import style from "../../todolist.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../../Todolist";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = memo(({task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {


    let {id, title, isDone} = {...task}

    /** DELETE-TASK*/
    const onclickDeleteTaskHandler = () => {
        removeTask(id)
    }

    /** CHECKED IS-DONE TASK*/
    const onChangeIsDoneTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const eventTask = event.currentTarget.checked
        changeTaskStatus(id, eventTask)
    }

    /** CHECKED IS-DONE TASK*/
    const onClickEditTitleHandler = (newTitle: string) => {
        changeTaskTitle(id, newTitle)
    }

    return (
        <div>
            <Checkbox
                onChange={onChangeIsDoneTaskHandler}
                checked={isDone}
                className={isDone ? style.isDoneTask : ""}
            />
            <EditableSpan title={title} callBack={onClickEditTitleHandler}/>

            <IconButton aria-label="delete" onClick={onclickDeleteTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
});
