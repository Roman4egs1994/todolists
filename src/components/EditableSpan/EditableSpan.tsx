import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        props.callBack(newTitle)
    }
    const onDoubleClickHandler = () => {
        setEdit(!edit)
    }
    return (
        edit
            ? <input value={newTitle} onChange={onChangeInputHandler} onBlur={onDoubleClickHandler} autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>

    );
};

