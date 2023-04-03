import React, {CSSProperties, memo} from 'react';
import Button from '@mui/material/Button';

/** Универсальная компонента :Button (Использует стили Material UI)
 *
 * Обязательные параметры: Название кнопки (title), действие на мышку (CallBack)
 * Необязательные параметры: ClassName (класс для стилей), style (инлайн стили), variant (cтили Material UI)
 *
 * */


type ButtonFilterPropsType = {
    disabled?: boolean
    title: string
    callBack: () => void
    className?: string
    style?: object
    variant?: "text" | "outlined" | "contained"
}


export const ButtonFilterTask: React.FC<ButtonFilterPropsType> = memo((props) => {
    const {title, callBack, className, disabled,style,variant,...otherProps} = props

    const onclickButtonHandler = () => {
        callBack()
    }

    console.log('RENDER', props.title)
    return (
        <Button
            style={style}
            variant={variant}
            className={className}
            disabled={disabled}
            onClick={onclickButtonHandler}
        >
            {title}
        </Button>
    );
});

