import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {ButtonFilterTask} from "../../common/components/Button/ButtonFilterTask";
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    callBack: (title:string)=> void
}


export const AddItemForm = memo ((props:AddItemFormPropsType) => {

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
       if(error) setError(null) //Убираем доп. ререндер
        if (event.key === 'Enter') {
            onclickButtonAddTaskHandler()
        }
    }

    const cssInlineStyle = {maxWidth: '39px', maxHeight: '39px', minWidth: '39px', minHeight: '39px'}

    return (
        <div>
            <TextField
                size={'small'}
                id="outlined-basic"
                error={!!error}
                label={error ? 'Type Text...' : 'Enter text'}
                variant="outlined"
                value={title}
                onChange={onChangeInputTitleTaskHandler}
                onKeyPress={onDoubleClickAddTaskTitleHandler}
            />
            <ButtonFilterTask title={'+'} callBack={onclickButtonAddTaskHandler} variant={'contained'} style={cssInlineStyle}/>
            {/*{error && <div className={style.error}>{error}</div>}*/}
        </div>
    );
});
