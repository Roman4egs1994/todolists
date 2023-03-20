import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../../common/components/Button/Button";
import style from "../../todolist.module.css";

type AddItemFormPropsType = {
    callBack: (title:string)=> void
}


export const AddItemForm = (props:AddItemFormPropsType) => {

    const [title, setTitle] = useState(``)
    const [error, setError] = useState<null | string>('')

    const onChangeInputTitleTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError('')
    }

    /** ADD-TASK*/
    const onclickButtonAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.callBack(title.trim())
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
    return (
        <div>
            <input
                value={title}
                onChange={onChangeInputTitleTaskHandler}
                onKeyPress={onDoubleClickAddTaskTitleHandler}
            />
            <Button title={'+'} callBack={onclickButtonAddTaskHandler}/>
            {error && <div className={style.error}>{error}</div>}
        </div>
    );
};
