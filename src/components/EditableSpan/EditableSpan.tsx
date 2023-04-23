import React, {ChangeEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';


type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
    disabled?: boolean
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        props.callBack(newTitle)
    }
    const onDoubleClickHandler = () => {
        setEdit(!edit)
    }

    return (
        edit
            ? <TextField
                id="standard-basic"
                variant="standard"
                value={newTitle}
                onChange={onChangeInputHandler}
                onBlur={onDoubleClickHandler}
                autoFocus
                disabled={props.disabled}
            />
            : <span
                onDoubleClick={onDoubleClickHandler}
            >{props.title}</span>

    );
});

